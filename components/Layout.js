import { useEffect } from "react";
import { useRouter } from "next/router";
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
