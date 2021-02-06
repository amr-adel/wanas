import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useIntl } from "react-intl";

import SetInnerHeightVar from "../utils/SetInnerHeightVar";
import Logo from "../utils/Logo";

import Modal from "../components/Modal";
import { useStore } from "../hooks/useStore";
import useLocalStorage from "../hooks/useLocalStorage";

import GeoCoder from "../components/GeoCoder";
import NavMenu from "../components/NavMenu";
import LocaleSwitcher from "../components/LocaleSwitcher";

export default function Layout({ children }) {
  const { locale, locales, pathname } = useRouter();
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
        router.push(pathname, pathname, {
          locale: user.locale,
        });
      }
    }
  }, []);

  return (
    <div>
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

      <SetInnerHeightVar />
      {showModal && (
        <Modal>
          <div className="flex flex-col justify-center text-center">
            <h2 className="text-xl text-red-500 text-center">
              {t("welcome.head")}
            </h2>

            <Logo type="text" classes="h-8 my-3" />

            <p className="text-gray-700">{t("welcome.change-locale")}</p>

            <div
              id="locale-switcher-container"
              className="p-2 my-4 bg-gray-200 rounded-md"
            >
              <LocaleSwitcher />
            </div>

            <button
              className="btn-outlined mx-auto text-gray-700"
              onClick={() => hideModal()}
            >
              {t("welcome.continue")}
            </button>
          </div>
        </Modal>
      )}

      {pathname !== "/" && (
        <header
          className={`flex justify-between items-start ${
            locale === "ar" ? "flex-row-reverse" : ""
          } p-2 h-14 pattern-dark fixed top-0 left-0 w-full z-50 shadow-md`}
        >
          <GeoCoder />
          <NavMenu />
        </header>
      )}

      {children}
    </div>
  );
}
