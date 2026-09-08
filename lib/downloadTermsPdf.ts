/**
 * Builds a real multi-page A4 PDF with forced margins on every page.
 * Uses CDN-loaded html2canvas + jsPDF so no local package install is required.
 */

const MARGIN_PX = 20;
const A4_WIDTH_PX = 794; // ~210mm at 96dpi
const A4_HEIGHT_PX = 1123; // ~297mm at 96dpi

type Html2CanvasFn = (
  element: HTMLElement,
  options?: Record<string, unknown>,
) => Promise<HTMLCanvasElement>;

type JsPdfCtor = new (options?: Record<string, unknown>) => {
  internal: { pageSize: { getWidth: () => number; getHeight: () => number } };
  addImage: (
    imageData: string,
    format: string,
    x: number,
    y: number,
    w: number,
    h: number,
  ) => void;
  addPage: () => void;
  save: (filename: string) => void;
};

declare global {
  interface Window {
    html2canvas?: Html2CanvasFn;
    jspdf?: { jsPDF: JsPdfCtor };
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-tp-pdf="${src}"]`,
    );
    if (existing) {
      if (existing.dataset.loaded === "1") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load ${src}`)),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.tpPdf = src;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

async function ensurePdfLibs(): Promise<{
  html2canvas: Html2CanvasFn;
  jsPDF: JsPdfCtor;
}> {
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
  );
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  );

  const html2canvas = window.html2canvas;
  const jsPDF = window.jspdf?.jsPDF;
  if (!html2canvas || !jsPDF) {
    throw new Error("PDF libraries failed to initialize");
  }
  return { html2canvas, jsPDF };
}

function buildPrintDocumentHtml(articleHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${A4_WIDTH_PX - MARGIN_PX * 2}px;
      background: #fff;
      color: #0b0b0b;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.55;
    }
    .doc-header {
      margin: 0 0 16px;
      padding: 0 0 12px;
      border-bottom: 2px solid #0b0b0b;
    }
    .doc-header .kicker {
      margin: 0 0 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6f6e68;
    }
    .doc-header h1 {
      margin: 0 0 6px;
      font-size: 26px;
      font-weight: 800;
      line-height: 1.2;
    }
    .doc-header .meta {
      font-size: 12px;
      color: #6f6e68;
    }
    .terms-print-section {
      padding: 14px 0;
      border-bottom: 1px dashed #cfc9bc;
    }
    .terms-print-section:last-child { border-bottom: none; }
    .terms-print-heading {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin: 0 0 10px;
    }
    .terms-print-heading > span {
      flex: 0 0 28px;
      width: 28px;
      height: 28px;
      border-radius: 999px;
      background: #0b0b0b;
      color: #fce001;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h2 {
      font-size: 18px;
      font-weight: 800;
      line-height: 1.25;
      color: #0b0b0b !important;
    }
    p, li {
      margin: 0 0 10px;
      color: #2f2f2b !important;
      max-width: 100%;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    ul { list-style: none; margin: 0 0 8px; padding: 0; }
    a { color: #0b0b0b !important; text-decoration: none !important; }
    .bg-clip-text, .text-transparent, em, span {
      background: none !important;
      -webkit-text-fill-color: initial !important;
      color: inherit !important;
    }
    h2 em, h2 span { color: #0b0b0b !important; font-style: italic; }
    .terms-print-keep {
      width: 100%;
      margin: 0 0 10px;
      padding: 10px 12px;
      border: 1px solid #d4d0c8;
      border-left: 4px solid #fdb813;
      border-radius: 6px;
      background: #fff;
    }
    li.terms-print-keep {
      position: relative;
      padding: 0 0 0 22px;
      margin: 0 0 8px;
      border: none;
      border-radius: 0;
      background: transparent;
    }
    li.terms-print-keep > span {
      position: absolute;
      left: 0;
      top: 0.2em;
      width: 14px;
      height: 14px;
      border-radius: 999px;
      background: #fce001;
      color: #0b0b0b;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .terms-print-allow-break {
      width: 100%;
      padding: 12px;
      border: 1px solid #d4d0c8;
      border-radius: 6px;
      background: #fff;
    }
    .terms-print-subhead {
      font-weight: 700 !important;
      color: #0b0b0b !important;
      margin-top: 10px !important;
    }
    .terms-print-contact {
      width: 100%;
      padding: 14px;
      border: 1px solid #d4d0c8;
      border-radius: 6px;
      background: #fff !important;
    }
    .terms-print-contact h2,
    .terms-print-contact-body,
    .terms-print-contact-body p,
    .terms-print-contact-body span,
    .terms-print-contact-body a {
      color: #0b0b0b !important;
    }
    .terms-print-contact-link {
      display: inline-block;
      margin: 0 8px 8px 0;
      padding: 8px 12px;
      border: 1px solid #0b0b0b;
      border-radius: 6px;
      color: #0b0b0b !important;
      background: #fff !important;
      font-size: 13px;
      font-weight: 600;
    }
    img { display: none !important; }
  </style>
</head>
<body>
  <header class="doc-header">
    <p class="kicker">Traveling Partner</p>
    <h1>Terms &amp; Conditions</h1>
    <p class="meta">Effective as of October 23, 2023 · traveling-partner.com</p>
  </header>
  <main>${articleHtml}</main>
</body>
</html>`;
}

export async function downloadTermsPdf(source: HTMLElement): Promise<void> {
  const { html2canvas, jsPDF } = await ensurePdfLibs();

  const clone = source.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("img").forEach((img) => img.remove());

  const host = document.createElement("iframe");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:-10000px;top:0;width:" +
    (A4_WIDTH_PX - MARGIN_PX * 2) +
    "px;height:0;border:0;opacity:0;pointer-events:none;";
  document.body.appendChild(host);

  const doc = host.contentDocument;
  if (!doc) {
    host.remove();
    throw new Error("Could not create PDF render frame");
  }

  doc.open();
  doc.write(buildPrintDocumentHtml(clone.innerHTML));
  doc.close();

  // Expand iframe to full content height for capture
  const body = doc.body;
  await new Promise((r) => window.setTimeout(r, 80));
  const contentHeight = Math.max(body.scrollHeight, body.offsetHeight);
  host.style.height = `${contentHeight + 40}px`;
  await new Promise((r) => window.setTimeout(r, 80));

  try {
    const canvas = await html2canvas(body, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: A4_WIDTH_PX - MARGIN_PX * 2,
      windowWidth: A4_WIDTH_PX - MARGIN_PX * 2,
      scrollX: 0,
      scrollY: 0,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [A4_WIDTH_PX, A4_HEIGHT_PX],
    });

    const usableWidth = A4_WIDTH_PX - MARGIN_PX * 2;
    const usableHeight = A4_HEIGHT_PX - MARGIN_PX * 2;
    const ratio = usableWidth / canvas.width;
    const pageSlicePx = usableHeight / ratio;

    let y = 0;
    let pageIndex = 0;

    while (y < canvas.height) {
      const sliceHeight = Math.min(pageSlicePx, canvas.height - y);
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.max(1, Math.ceil(sliceHeight));

      const ctx = pageCanvas.getContext("2d");
      if (!ctx) break;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        canvas,
        0,
        y,
        canvas.width,
        sliceHeight,
        0,
        0,
        canvas.width,
        sliceHeight,
      );

      const sliceData = pageCanvas.toDataURL("image/jpeg", 0.95);
      const displayHeight = sliceHeight * ratio;

      if (pageIndex > 0) {
        pdf.addPage([A4_WIDTH_PX, A4_HEIGHT_PX], "portrait");
      }

      // Forced 20px gap on every side of every page
      pdf.addImage(
        sliceData,
        "JPEG",
        MARGIN_PX,
        MARGIN_PX,
        usableWidth,
        displayHeight,
      );

      y += sliceHeight;
      pageIndex += 1;
    }

    pdf.save("Traveling-Partner-Terms-Conditions.pdf");
  } finally {
    host.remove();
  }
}
