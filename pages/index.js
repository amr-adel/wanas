import Head from "next/head";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";

import SetInnerHeightVar from "../utils/SetInnerHeightVar";
import Logo from "../utils/Logo";
import GeoCoder from "../components/GeoCoder";
import Modal from "../components/Modal";
import { useStore } from "../hooks/useStore";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

export default function Home() {
  const { locale, locales, pathname } = useRouter();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div className="bg-gray-800 min-h-inner w-screen flex flex-col items-center">
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <div
        id="branding"
        className="p-4 flex flex-col h-64 w-full justify-center bg-gray-200 rounded-b-lg shadow-lg"
      >
        <Logo classes="h-32 mb-4" />
        <Logo type="text" classes="h-8" />
      </div>

      <div id="start" className="w-full p-4 flex flex-col items-center">
        <GeoCoder />
      </div>
    </div>
  );
}
