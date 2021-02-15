import Head from "next/head";

import { useIntl } from "react-intl";

export default function Explore() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div className="min-h-inner pt-14 flex flex-col">
      <Head>
        <title>{t("app.name")}</title>
      </Head>
      ABOUT
    </div>
  );
}
