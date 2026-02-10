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
      } else if (ua.includes("mac") || ua.includes("macintosh")) {
        setPlatform("macos");
      } else if (ua.includes("windows")) {
        setPlatform("windows");
      } else if (ua.includes("linux")) {
        setPlatform("linux");
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
        return <i className="devicon-android-plain" aria-hidden="true"></i>;
      case "ios":
      case "macos":
        return <i className="devicon-apple-original" aria-hidden="true"></i>;
      case "windows":
        return <i className="devicon-windows8-original" aria-hidden="true"></i>;
      case "linux":
        return <i className="devicon-linux-original" aria-hidden="true"></i>;
      default:
        return <i className="devicon-devicon-plain" aria-hidden="true"></i>;
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0055d4" />
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
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
          <div className="pwa-banner__content">
            <strong>Instale o PertoDaqui</strong>
            <span className="pwa-banner__text">
              Instale para descobrir o que tem perto de você.
            </span>
          </div>
          <div className="pwa-banner__actions">
            <button className="pwa-banner__btn" onClick={handleInstallClick}>
              <span className="pwa-banner__btn-icon" aria-hidden="true">
                {platformIcon()}
              </span>
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
