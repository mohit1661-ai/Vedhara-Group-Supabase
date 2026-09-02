/**
 * GA4 + Meta Pixel, rendered directly into the server HTML of every page.
 *
 * Client-injected tags (an earlier implementation loaded them 10 seconds after
 * mount) are invisible to crawlers, ad-pixel helpers and analytics scanners,
 * and lose every session that ends early. Rendering the tags into the initial
 * HTML fixes detection and data completeness; the gtag loader keeps `async`,
 * so it never blocks rendering or hydration.
 *
 * Bandwidth tuning: the gtag loader stays in the HTML (needed for scanner
 * detection). The heavier fbevents.js (~106KB) is injected a moment after
 * window load — the inline fbq stub queues `init`/`track` in the meantime,
 * so tracking still captures every session and the pixel stays detectable
 * (the stub + noscript img are in the HTML).
 *
 * IDs come from NEXT_PUBLIC_* env vars and fall back to the company's
 * registered tags so the site works with zero env vars configured.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-135693XWXG";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "245711093135178";

const GA_CONFIG = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;

// Meta-compatible stub: queues calls until fbevents.js loads (post window load).
const FB_STUB = `window.fbq=window.fbq||function(){window.fbq.queue?window.fbq.queue.push(arguments):(window.fbq.queue=[arguments])};window.fbq.version='2.0';window.fbq.loaded=!0;fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`;
const FB_LOADER = `window.addEventListener('load',function(){setTimeout(function(){var s=document.createElement('script');s.async=!0;s.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(s)},2e3)});`;

export default function Analytics() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script dangerouslySetInnerHTML={{ __html: GA_CONFIG }} />
      <script dangerouslySetInnerHTML={{ __html: FB_STUB + FB_LOADER }} />
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
