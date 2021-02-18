import Head from "next/head";
import Logo from "../utils/Logo";

import { useIntl } from "react-intl";

export default function Explore() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div className="min-h-inner pt-14 flex flex-col pattern-light">
      <Head>
        <title>{`${t("app.name")} | ${t("menu.about")}`}</title>
      </Head>

      <Logo classes="w-24 mt-8 mx-auto" />
      <Logo type="text" classes="h-8 my-4 mx-auto" />

      <main
        id="about-container"
        className="p-4 my-4 mx-2 flex flex-col bg-gray-50 rounded-lg shadow-md"
      >
        <h1 className="text-xl text-red-500 pb-4 mb-4 border-b border-gray-200">
          {t("menu.about")}
        </h1>

        {locale !== "ar" && (
          <p className="text-gray-700">"ونس" {t("about.non-arabic")}</p>
        )}

        <p className="my-2">{t("about.p1")}</p>
        <p className="my-2">{t("about.p2")}</p>
        <p className="my-2">{t("about.p3")}</p>
        <p className="my-2 pt-2 text-xs text-gray-700 border-t border-gray-200">
          {t("about.p4")}
        </p>
      </main>
    </div>
  );
}
