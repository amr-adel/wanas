import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useIntl } from "react-intl";

import SetInnerHeightVar from "../utils/SetInnerHeightVar";
import Logo from "../utils/Logo";

import Modal from "../components/Modal";
import Header from "../components/Header";
import { useStore } from "../hooks/useStore";
import useLocalStorage from "../hooks/useLocalStorage";

import LocaleSwitcher from "../components/LocaleSwitcher";

export default function Layout({ children }) {
  const { locale, asPath } = useRouter();
  const router = useRouter();

  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  const showModal = useStore((state) => state.showModal);
  const hideModal = useStore((state) => state.hideModal);
  const [user, setUser] = useLocalStorage("user_settings", null);

  useEffect(() => {
    if (user === null) {
      showModal();
      setUser({ locale: locale });
    } else {
      if (user.locale !== locale) {
        router.replace(asPath, asPath, {
          locale: user.locale,
        });
      }
    }
  }, []);

  return (
    <div className="pattern-light min-h-inner">
      {/* head tags */}
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/app-icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/app-icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/app-icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/app-icons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/app-icons/safari-pinned-tab.svg"
          color="#ef4444"
        />
        <link rel="shortcut icon" href="/app-icons/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Wanas" />
        <meta name="application-name" content="Wanas" />
        <meta name="msapplication-TileColor" content="#f1f5f9" />
        <meta
          name="msapplication-config"
          content="/app-icons/browserconfig.xml"
        />
        <meta name="theme-color" content="#f1f5f9" />
      </Head>

      {/* Set h-inner (100vh without bars) */}
      <SetInnerHeightVar />

      {/* Set user locale on first visit */}
      {showModal && (
        <Modal>
          <div className="p-2 py-4 bg-gray-200 flex flex-col justify-center text-center rounded-lg border border-gray-300">
            <h2 className="text-xl text-red-500 text-center">
              {t("welcome.head")}
            </h2>

            <Logo type="text" className="h-8 my-3" />

            <p className="text-gray-700">{t("welcome.change-locale")}</p>

            <div
              id="locale-switcher-container"
              className="w-full my-4 pb-4 border-b border-gray-300"
            >
              <LocaleSwitcher />
            </div>

            <button
              className="btn-outlined mx-auto text-gray-600"
              onClick={() => hideModal()}
            >
              {t("welcome.continue")}
            </button>
          </div>
        </Modal>
      )}

      {/* Fixed header */}
      <Header />

      {/* Main body */}
      {children}
    </div>
  );
}

export function LayoutWithMap({ children }) {
  const { locale } = useRouter();

  return (
    <main
      className={`container pt-16 pb-4 flex flex-col space-y-4 md:h-inner md:items-center md:space-y-0 md:flex-row-reverse md:space-x-4 ${
        locale !== "ar" && "md:space-x-reverse"
      }`}
    >
      {children}
    </main>
  );
}
