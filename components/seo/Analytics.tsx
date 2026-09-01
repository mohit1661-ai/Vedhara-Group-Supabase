/**
 * GA4 + Meta Pixel, rendered directly into the server HTML of every page.
 *
 * Client-injected tags (previous implementation loaded them 10 seconds after
 * mount) are invisible to crawlers, ad-pixel helpers and analytics scanners,
 * and lose every session that ends early. Rendering the tags into the initial
 * HTML fixes detection and data completeness; the external loaders keep
 * `async`, so neither tag blocks rendering or hydration.
 *
 * IDs come from NEXT_PUBLIC_* env vars and fall back to the company's
 * registered tags so the site works with zero env vars configured.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-135693XWXG";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "245711093135178";

const GA_CONFIG = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;

const FB_INIT = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`;

export default function Analytics() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script dangerouslySetInnerHTML={{ __html: GA_CONFIG }} />
      <script dangerouslySetInnerHTML={{ __html: FB_INIT }} />
      <noscript>
        {/* Tracking pixel must be a raw <img>; next/image can't render inside <noscript>. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
