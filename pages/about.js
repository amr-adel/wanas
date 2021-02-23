import Head from "next/head";
import { useIntl } from "react-intl";

import Logo from "../utils/Logo";

export default function Explore() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div className="min-h-inner pt-16 pb-4 px-2 flex flex-col space-y-4 pattern-light">
      <Head>
        <title>{`${t("app.name")} | ${t("menu.about")}`}</title>
      </Head>

      <Logo classes="w-24 mx-auto" />
      <Logo type="text" classes="h-8 mx-auto" />

      <main
        id="about-container"
        className="p-4 flex flex-col bg-gray-50 rounded-lg shadow-md"
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
