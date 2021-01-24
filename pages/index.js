import Head from "next/head";
import { useIntl } from "react-intl";
import GeoCoder from "../components/geoCoder";
import NavMenu from "../components/NavMenu";

export default function Home() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div>
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <header dir="ltr" className="flex p-2 h-14 bg-brown">
        <GeoCoder />
        <NavMenu />
      </header>

      <h1 className="font-bold">{t("app.name")}</h1>
      <h3>{t("home.hello")}</h3>
    </div>
  );
}
