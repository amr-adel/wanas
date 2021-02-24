import { useRouter } from "next/router";
import { localeNames } from "../lang";

import useLocalStorage from "../hooks/useLocalStorage";

export default function LocaleSwitcher({ menu = false }) {
  const { locale, locales, asPath } = useRouter();
  const router = useRouter();

  const [user, setUser] = useLocalStorage("user_settings", null);

  const handleChangeLocale = (newLocale) => {
    router.replace(asPath, asPath, {
      locale: newLocale,
    });

    setUser({ locale: newLocale });
  };

  return (
    <ul
      dir="ltr"
      className={`flex w-full max-w-sm mx-auto justify-between ${
        menu ? "lg:flex-col" : "bg-gray-50 rounded-lg"
      }`}
    >
      {locales.map((loc) => {
        return (
          <li
            key={loc}
            className={`border-0 flex-grow border-gray-600 ${
              menu && loc === locale && "lg:order-first"
            }`}
          >
            <button
              onClick={() => handleChangeLocale(loc)}
              className={`w-full p-2 text-center text-lg rounded-lg focus:outline-none ${
                menu && "lg:text-base"
              } ${
                loc === locale
                  ? `bg-yellow text-yellow-600 ${menu && "lg:bg-yellow-100"}`
                  : "text-gray-400"
              }`}
            >
              {localeNames[loc]}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
