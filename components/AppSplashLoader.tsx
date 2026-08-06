import TPLoader from "@/components/TPLoader";

/**
 * Server-rendered splash — paints + animates immediately on reload
 * (no waiting for React hydration / Framer Motion).
 * A tiny inline script removes it after load with no start delay.
 */
export default function AppSplashLoader() {
  return (
    <>
      <div
        id="tp-app-splash"
        className="tp-app-splash"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <TPLoader variant="inline" size={96} />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var el=document.getElementById("tp-app-splash");if(!el)return;var done=false;function hide(){if(done||!el)return;done=true;el.classList.add("tp-app-splash--hide");document.body.style.overflow="";setTimeout(function(){el&&el.remove();},260);}document.body.style.overflow="hidden";if(document.readyState==="complete"){hide();}else{window.addEventListener("load",hide,{once:true});}setTimeout(hide,2200);})();`,
        }}
      />
    </>
  );
}
