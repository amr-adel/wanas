import Head from "next/head";
import { useIntl } from "react-intl";

import FourSquare from "../components/FourSquare";

export default function Explore() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div>
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <div className="w-full h-64 bg-yellow flex justify-center items-center fixed top-14 text-brown-50">
        MAP
      </div>

      <FourSquare />
    </div>
  );
}
