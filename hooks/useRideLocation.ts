"use client";

import { useEffect, useRef, useState } from "react";
import { fetchRideLocationJson } from "@/lib/rideLocation/http";
import { viewFromCurrent, viewFromSnapshot, viewFromSocket } from "@/lib/rideLocation/parse";
import type {
  RideLocationConnection,
  RideLocationCurrentData,
  RideLocationPageState,
  RideLocationSnapshotData,
  RideLocationSocketMessage,
  RideLocationViewData,
} from "@/lib/rideLocation/types";
import {
  CLOSE_EXPIRED_OR_ENDED,
  CLOSE_INVALID_LINK,
  CLOSE_MISSING_TOKEN,
} from "@/lib/rideLocation/types";
import {
  buildRideLocationCurrentUrl,
  buildRideLocationSnapshotUrl,
  buildRideLocationSocketUrl,
} from "@/lib/rideLocation/urls";

const POLL_MS = 5000;
const RECONNECT_BASE_MS = 1000;
const RECONNECT_MAX_MS = 8000;
const WS_RETRY_WHILE_POLLING_MS = 12000;

function closeKind(code: number): "invalid" | "expired" | null {
  if (code === CLOSE_EXPIRED_OR_ENDED) return "expired";
  if (code === CLOSE_INVALID_LINK || code === CLOSE_MISSING_TOKEN) return "invalid";
  if (code >= 4000) return "invalid";
  return null;
}

function pageStateFromData(data: RideLocationViewData): RideLocationPageState {
  if (data.status === "cancelled") return "cancelled";
  if (data.status === "ended") return "ended";
  return "live";
}

export function useRideLocation(token: string | null, enabled = true) {
  const [pageState, setPageState] = useState<RideLocationPageState>("connecting");
  const [data, setData] = useState<RideLocationViewData | null>(null);
  const [connection, setConnection] = useState<RideLocationConnection>("connecting");
  const [closeReason, setCloseReason] = useState<string | null>(null);

  const dataRef = useRef<RideLocationViewData | null>(null);
  const openedRef = useRef(false);
  const terminalRef = useRef(false);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wsRetryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = useRef(0);
  const pollingRef = useRef(false);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (!token) {
      setPageState("invalid");
      setCloseReason("This tracking link is missing a share token.");
      return;
    }

    let cancelled = false;
    let socket: WebSocket | null = null;
    terminalRef.current = false;
    openedRef.current = false;
    pollingRef.current = false;
    attemptRef.current = 0;
    setPageState("connecting");
    setConnection("connecting");
    setCloseReason(null);
    setData(null);
    dataRef.current = null;

    const clearTimers = () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      if (wsRetryTimerRef.current) {
        clearTimeout(wsRetryTimerRef.current);
        wsRetryTimerRef.current = null;
      }
    };

    const applyView = (next: RideLocationViewData) => {
      if (cancelled) return;
      dataRef.current = next;
      setData(next);
      const nextState = pageStateFromData(next);
      setPageState(nextState);
      if (nextState === "ended" || nextState === "cancelled") {
        terminalRef.current = true;
        clearTimers();
      }
    };

    const applySocketPayload = (raw: string) => {
      let parsed: RideLocationSocketMessage;
      try {
        parsed = JSON.parse(raw) as RideLocationSocketMessage;
      } catch {
        return;
      }
      if (parsed?.type !== "RIDE_LOCATION_UPDATE" || !parsed.data) return;
      applyView(viewFromSocket(parsed.data, dataRef.current));
    };

    const stopPolling = () => {
      pollingRef.current = false;
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
      if (wsRetryTimerRef.current) {
        clearTimeout(wsRetryTimerRef.current);
        wsRetryTimerRef.current = null;
      }
    };

    const pollOnce = async () => {
      const current = await fetchRideLocationJson<RideLocationCurrentData>(
        buildRideLocationCurrentUrl(token)
      );
      if (cancelled || terminalRef.current) return;

      if (!current.ok) {
        if (current.statusCode === 404) {
          terminalRef.current = true;
          clearTimers();
          setPageState("invalid");
          setCloseReason(current.message || "Location share not found or expired");
          setConnection("connecting");
        }
        return;
      }

      applyView(viewFromCurrent(current.data, dataRef.current));
    };

    const scheduleWsRetry = () => {
      if (cancelled || terminalRef.current || wsRetryTimerRef.current) return;
      wsRetryTimerRef.current = setTimeout(() => {
        wsRetryTimerRef.current = null;
        if (cancelled || terminalRef.current) return;
        openedRef.current = false;
        connectSocket();
      }, WS_RETRY_WHILE_POLLING_MS);
    };

    const startPolling = async () => {
      if (cancelled || terminalRef.current || pollingRef.current) return;
      pollingRef.current = true;
      setConnection("polling");

      const snapshot = await fetchRideLocationJson<RideLocationSnapshotData>(
        buildRideLocationSnapshotUrl(token)
      );
      if (cancelled || terminalRef.current) return;

      if (snapshot.ok) {
        applyView(viewFromSnapshot(snapshot.data, dataRef.current));
      } else if (snapshot.statusCode === 404) {
        terminalRef.current = true;
        clearTimers();
        setPageState("invalid");
        setCloseReason(snapshot.message || "Location share not found or expired");
        return;
      }

      await pollOnce();
      if (cancelled || terminalRef.current) return;

      pollTimerRef.current = setInterval(() => {
        void pollOnce();
      }, POLL_MS);

      scheduleWsRetry();
    };

    const connectSocket = () => {
      if (cancelled || terminalRef.current) return;

      try {
        socket = new WebSocket(buildRideLocationSocketUrl(token));
      } catch {
        void startPolling();
        return;
      }

      if (!pollingRef.current) {
        setConnection(openedRef.current ? "reconnecting" : "connecting");
      }

      socket.onopen = () => {
        if (cancelled) return;
        openedRef.current = true;
        attemptRef.current = 0;
        stopPolling();
        setConnection("live");
      };

      socket.onmessage = (event) => {
        if (cancelled || typeof event.data !== "string") return;
        applySocketPayload(event.data);
        setConnection("live");
      };

      socket.onclose = (event) => {
        if (cancelled || terminalRef.current) return;

        const kind = closeKind(event.code);
        if (kind) {
          terminalRef.current = true;
          clearTimers();
          setPageState(kind);
          setCloseReason(event.reason?.trim() || null);
          setConnection("connecting");
          return;
        }

        if (openedRef.current && dataRef.current && pageStateFromData(dataRef.current) === "live") {
          setConnection("reconnecting");
          const delay = Math.min(
            RECONNECT_MAX_MS,
            RECONNECT_BASE_MS * 2 ** attemptRef.current
          );
          attemptRef.current += 1;
          reconnectTimerRef.current = setTimeout(connectSocket, delay);
          return;
        }

        if (pollingRef.current) {
          scheduleWsRetry();
          return;
        }

        void startPolling();
      };

      socket.onerror = () => {
        // onclose follows; don't log — the URL contains the token.
      };
    };

    connectSocket();

    return () => {
      cancelled = true;
      terminalRef.current = true;
      clearTimers();
      try {
        socket?.close();
      } catch {
        /* ignore */
      }
    };
  }, [token, enabled]);

  return { pageState, data, connection, closeReason };
}
