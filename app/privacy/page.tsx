import StaticRedirect from "@/components/StaticRedirect";

/** Legacy route — keep URL working by sending users to the real policy page. */
export default function Privacy() {
  return <StaticRedirect to="/privacy-policy" />;
}
