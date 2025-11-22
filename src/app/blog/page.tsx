// src/app/blog/page.tsx
'use client';

import Script from "next/script";
import { useEffect } from "react";
import BlogList from "./components/BlogList";

const AD_CLIENT_ID = "ca-pub-8457324050105904";
const AD_SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "blog-inline-slot";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function BlogPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Adsense error", error);
    }
  }, []);

  return (
    <div className="space-y-8">
      <Script
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT_ID}`}
        crossOrigin="anonymous"
      />

      <BlogList />

      <aside className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Sponsored
        </p>
        <div className="flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: 90, width: "100%" }}
            data-ad-client={AD_CLIENT_ID}
            data-ad-slot={AD_SLOT_ID}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </aside>
    </div>
  );
}
