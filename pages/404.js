import Head from "next/head";
import Link from "next/link";
import { useIntl } from "react-intl";

export default function Page404() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <main className="container pt-96 md:pt-16 pb-4 md:min-h-inner w-full md:flex md:flex-col lg:flex-row md:justify-center md:items-center">
      <Head>
        <title>{`${t("app.name")} | 404`}</title>
      </Head>

      <div
        id="about-container"
        className="text-center p-4 flex flex-col bg-gray-50 space-y-4 rounded-lg shadow-lg relative z-10 max-w-xl"
      >
        <h1 className="text-3xl text-red-500 pb-2 border-b border-gray-200">
          404
        </h1>

        <p>{t("page404.message")}</p>

        <Link href="/">
          <button className="btn-outlined mx-auto text-gray-600 capitalize">
            {t("page404.link")}
          </button>
        </Link>
      </div>
    </main>
  );
}
