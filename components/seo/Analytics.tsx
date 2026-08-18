"use client";

import { useEffect } from "react";

/**
 * Third-party analytics & remarketing tags (GA4 + Meta Pixel), loaded with
 * next/script `lazyOnload` so they do not compete with the hero and critical page resources.
 *
 * IDs come from NEXT_PUBLIC_* env vars and fall back to the company's
 * registered tags so the site works with zero env vars configured.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-135693XWXG";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "245711093135178";

export default function Analytics() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const ga = document.createElement("script");
      ga.async = true;
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(ga);

      const gaInit = document.createElement("script");
      gaInit.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;
      document.head.appendChild(gaInit);

      const metaInit = document.createElement("script");
      metaInit.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`;
      document.head.appendChild(metaInit);
    }, 10000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <noscript>
        {/* Tracking pixel must be a raw <img> — next/image can't render inside <noscript>. */}
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
