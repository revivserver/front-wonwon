import '../styles/globals.css';
import '../components/modal/modal.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // 👈
import Script from 'next/script';
config.autoAddCss = false; // 👈

function MyApp({ Component, pageProps }) {
  return <>
    <Script 
      strategy='afterInteractive'
      src="https://www.googletagmanager.com/gtag/js?id=G-BLZSFCNBRZ"
    />
    <Script id="google-analytics" strategy='afterInteractive'>
      {`  
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BLZSFCNBRZ');
      `}
    </Script>
      
    <Component {...pageProps} />
  </> 
}

export default MyApp;
