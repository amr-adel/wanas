import { useRouter } from "next/router";
import { localeNames } from "../lang";

import useLocalStorage from "../hooks/useLocalStorage";

export default function LocaleSwitcher() {
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
    <ul dir="ltr" className="flex items-center justify-center">
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
  );
}
