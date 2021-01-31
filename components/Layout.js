import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { localeNames } from "../lang";

import SetInnerHeightVar from "../utils/SetInnerHeightVar";
import Logo from "../utils/Logo";

import Modal from "../components/Modal";
import { useStore } from "../hooks/useStore";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

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

  const handleChangeLocale = (newLocale) => {
    router.push(pathname, pathname, {
      locale: newLocale,
    });

    setUser({ locale: newLocale });
  };

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

            <ul
              dir="ltr"
              className="my-4 py-2 flex items-center justify-center border rounded-md border-gray-200"
            >
              {locales.map((loc) => {
                return (
                  <li key={loc}>
                    <button
                      onClick={() => handleChangeLocale(loc)}
                      className={`btn mx-2 ${
                        loc === locale ? "bg-red-500 text-red-50" : ""
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  </li>
                );
              })}
            </ul>

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
          dir="ltr"
          className="flex p-2 h-14 bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md"
        >
          {/* <GeoCoder setCenter={setCenter} /> */}
          {/* <NavMenu /> */}
        </header>
      )}

      {children}
    </div>
  );
}
