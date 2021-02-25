import Head from "next/head";
import { useIntl } from "react-intl";
import { LayoutDetails, LayoutMap } from "../components/Layout";

import Logo from "../utils/Logo";

export default function Explore() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <>
      <Head>
        <title>{`${t("app.name")} | ${t("menu.about")}`}</title>
      </Head>

      <LayoutMap>
        <div
          id="about-container"
          className="p-4 flex flex-col bg-gray-50 space-y-4 rounded-lg shadow-md"
        >
          <h1 className="text-xl text-red-500 pb-2 border-b border-gray-200">
            {t("menu.about")}
          </h1>

          {locale !== "ar" && (
            <p className="text-gray-700">"ونس" {t("about.non-arabic")}</p>
          )}

          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
          <p className="pt-2 text-xs text-gray-700 border-t border-gray-200">
            {t("about.p4")}
          </p>
        </div>
      </LayoutMap>

      <LayoutDetails>
        <Logo className="w-24 mx-auto" />
        <Logo type="text" className="h-8 mx-auto" />
      </LayoutDetails>
    </>
  );
}
