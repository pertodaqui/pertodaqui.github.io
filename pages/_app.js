import Script from "next/script";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
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

// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-4PK6JRYRHV"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-4PK6JRYRHV');
// </script>