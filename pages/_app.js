import { useEffect } from "react";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as locales from "../lang";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { locale, defaultLocale } = useRouter();

  const messages = locales[locale];

  useEffect(() => {
    if (locale === "ar") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default MyApp;
