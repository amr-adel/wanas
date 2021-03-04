import Head from "next/head";
import { useIntl } from "react-intl";

import Logo from "../utils/Logo";

export default function Explore() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <main className="container pt-96 md:pt-16 pb-4 md:min-h-inner w-full md:flex md:flex-col lg:flex-row md:justify-center md:items-center">
      <Head>
        <title key="title">
          {t("app.name")} | {t("menu.about")}
        </title>
        <meta
          name="twitter:title"
          content={t("app.name") + " | " + t("menu.about")}
          key="twitter-title"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:title"
          content={t("app.name") + " | " + t("menu.about")}
          key="og-title"
        />
      </Head>

      <div
        id="brand"
        className="fixed md:relative h-80 md:h-auto pt-4 lg:pt-0 top-12 md:top-auto left-0 right-0 flex flex-col justify-center items-center mx-auto md:mb-12 lg:m-20"
      >
        <Logo className="h-44 w-32 mb-6" />
        <Logo type="text" className="h-12 w-52" />
      </div>

      <div
        id="about-container"
        className="p-4 flex flex-col bg-gray-50 space-y-4 rounded-lg shadow-lg relative z-10 md:max-w-xl"
      >
        <h1 className="text-xl text-red-500 pb-2 border-b border-gray-200">
          {t("menu.about")}
        </h1>

        {locale !== "ar" && (
          <p className="p-2 bg-yellow-50 text-yellow text-center rounded-lg shadow">
            "ونس" {t("about.non-arabic")}
          </p>
        )}

        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>{t("about.p3")}</p>
        <p className="pt-2 text-xs text-gray-500 border-t border-gray-200">
          {t("about.p4")}
        </p>
      </div>
    </main>
  );
}
