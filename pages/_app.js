import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="theme-color" content="#0e45a9" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/pwa/icon-192.png" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4PK6JRYRHV"
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-4PK6JRYRHV');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
