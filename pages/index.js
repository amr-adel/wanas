import Head from "next/head";
import { useIntl } from "react-intl";

export default function Home() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div>
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <h1 className="font-bold">{t("app.name")}</h1>
      <h3>{t("home.hello")}</h3>
    </div>
  );
}
