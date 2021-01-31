import { SWRConfig } from "swr";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as locales from "../lang";

import "../styles/globals.css";
import "../styles/app.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const { locale, defaultLocale } = useRouter();

  const messages = locales[locale];

  useEffect(() => {
    document.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <SWRConfig
        value={{
          initialData: null,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false,
          onError: (err, key, config) => console.log(err, key),
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </IntlProvider>
  );
}

export default MyApp;
