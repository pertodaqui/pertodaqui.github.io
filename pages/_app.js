import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
      });
    }
  }, []);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("android")) {
        setPlatform("android");
      } else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
        setPlatform("ios");
      } else {
        setPlatform("desktop");
      }
    }

    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setShowInstallPrompt(true);
    };

    const handleInstalled = () => {
      setShowInstallPrompt(false);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const platformIcon = () => {
    switch (platform) {
      case "android":
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7.1 5.2 6 3.3c-.2-.3-.1-.7.2-.9.3-.2.7-.1.9.2l1.2 2.1c1.1-.5 2.4-.7 3.7-.7s2.6.2 3.7.7l1.2-2.1c.2-.3.6-.4.9-.2.3.2.4.6.2.9l-1.1 1.9C18.3 6.1 19 7.4 19 9v7.2c0 .9-.7 1.6-1.6 1.6H6.6c-.9 0-1.6-.7-1.6-1.6V9c0-1.6.7-2.9 2.1-3.8zM8 9.5c0 .4-.3.7-.7.7S6.6 9.9 6.6 9.5s.3-.7.7-.7.7.3.7.7zm9.4 0c0 .4-.3.7-.7.7s-.7-.3-.7-.7.3-.7.7-.7.7.3.7.7z"
            />
          </svg>
        );
      case "ios":
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16.6 2.8c-.8.1-1.7.6-2.3 1.3-.6.7-1.1 1.7-.9 2.7 1 .1 1.9-.4 2.5-1.1.6-.7 1-1.7.7-2.9zm3.6 14.5c-.5 1.2-1.1 2.1-1.9 3-.7.8-1.5 1.1-2.4 1.1-.8 0-1.1-.2-2-.6-.9-.4-1.7-.6-2.6-.6-1 0-1.8.2-2.7.6-.8.4-1.1.6-2 .6-.9 0-1.6-.3-2.4-1.1-1.7-1.8-3-4.8-3-7.5 0-2.4.9-4.2 2.1-5.4 1-1 2.3-1.6 3.5-1.6.7 0 1.6.2 2.6.6.9.3 1.4.5 1.8.5.3 0 .9-.2 1.8-.5 1.1-.4 2-.6 2.4-.6.4 0 1.6.1 2.7.8-1.1.7-1.9 2-1.8 3.5.1 1.9 1.3 3 2.8 3.6-.2.4-.3.7-.5 1z"
            />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-5v2h3c.6 0 1 .4 1 1H7c0-.6.4-1 1-1h3v-2H6c-1.1 0-2-.9-2-2V6zm2 0v8h12V6H6z"
            />
          </svg>
        );
    }
  };

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setShowInstallPrompt(false);
    setInstallPrompt(null);
  };

  return (
    <>
      <Head>
        <meta name="theme-color" content="#0e45a9" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/pwa/apple-touch-icon.png" />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)"
          href="/pwa/splash/splash-1290x2796.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)"
          href="/pwa/splash/splash-1179x2556.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)"
          href="/pwa/splash/splash-1284x2778.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
          href="/pwa/splash/splash-1170x2532.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          href="/pwa/splash/splash-1125x2436.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          href="/pwa/splash/splash-1242x2688.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          href="/pwa/splash/splash-828x1792.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
          href="/pwa/splash/splash-1242x2208.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          href="/pwa/splash/splash-750x1334.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          href="/pwa/splash/splash-640x1136.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          href="/pwa/splash/splash-2048x2732.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          href="/pwa/splash/splash-1668x2388.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          href="/pwa/splash/splash-1668x2224.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          href="/pwa/splash/splash-1536x2048.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
      {showInstallPrompt ? (
        <div className="pwa-banner" role="dialog" aria-live="polite">
          <div className="pwa-banner__main">
            <div className="pwa-banner__icon">{platformIcon()}</div>
            <div className="pwa-banner__content">
              <strong>Instale o PertoDaqui</strong>
              <span>Tenha o app com acesso rapido na tela inicial.</span>
            </div>
          </div>
          <div className="pwa-banner__actions">
            <button className="pwa-banner__btn" onClick={handleInstallClick}>
              Instalar
            </button>
            <button
              className="pwa-banner__btn pwa-banner__btn--ghost"
              onClick={() => setShowInstallPrompt(false)}
            >
              Agora não
            </button>
          </div>
        </div>
      ) : null}
      <Component {...pageProps} />
    </>
  );
}
