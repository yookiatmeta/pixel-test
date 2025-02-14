import React from "react";
import { Helmet } from "react-helmet";
import CookieConsent from "react-cookie-consent";
import { useLocation } from "@reach/router";
import { initializeAndTrack } from "gatsby-plugin-gdpr-cookies";

import { Header } from "./Header";
import { FacebookPixelProvider } from "./FacebookPixelProvider";

const CONSENT_COOKIE_NAME = "cookie-consent";

const layoutStyle: React.CSSProperties = {
  maxWidth: 650,
};

const pageStyles: React.CSSProperties = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

export const Layout: React.FC = ({ children }) => {
  const location = useLocation(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment

  return (
    <FacebookPixelProvider>
      <Helmet
        title="Altmeta.org Pixel Test"
        meta={[
          {
            name: "description",
            content: "a website for testing facebook pixel",
          },
          { name: "keywords", content: "facebook, pixel" },
          { name: "author", content: "Zack Spellman" },
        ]}
      >
        <html lang="en" />
        <script>
          {`
            !function(a,h,e,v,n,t,s)
            {if(a.cbq)return;n=a.cbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!a._cbq)a._cbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=h.createElement(e);t.async=!0;
            t.src=v;s=h.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://d1z8a5ym47iyzm.cloudfront.net/sdk/2417467972497445942/events.js');
            cbq('setHost', 'https://d1z8a5ym47iyzm.cloudfront.net/');
            cbq('init', '2417467972497445942');
            cbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=600860476089200&ev=PageView&noscript=1"
            />
          `}
        </noscript>
      </Helmet>
      <div style={layoutStyle}>
        <Header />
        <main style={pageStyles}>{children}</main>
        <CookieConsent
          cookieName={CONSENT_COOKIE_NAME}
          onAccept={() => initializeAndTrack(location)}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </div>
    </FacebookPixelProvider>
  );
};
