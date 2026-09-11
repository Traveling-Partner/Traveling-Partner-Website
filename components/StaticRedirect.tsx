/**
 * Static-export-safe redirect. next/navigation redirect() can emit a crashed
 * `__next_error__` document (HTTP 200) on DigitalOcean. Same destination,
 * no UI — just send the browser to `to`.
 */
export default function StaticRedirect({ to }: { to: string }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{location.replace(${JSON.stringify(to)})}catch(e){}`,
        }}
      />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${to}`} />
      </noscript>
    </>
  );
}
