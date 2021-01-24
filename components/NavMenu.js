import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import Link from "next/link";

import Icon from "./Icon";

const localesName = {
  en: "English",
  es: "Español",
  ar: "عربي",
};

export default function NavMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const { locale, locales } = useRouter();
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  useEffect(() => {
    if (showMenu) {
      window.addEventListener("click", hideMenu);
    }

    return () => {
      window.removeEventListener("click", hideMenu);
    };
  }, [showMenu]);

  const toggleMenu = () => setShowMenu(!showMenu);

  const hideMenu = (e) => {
    // Hide menu on clicking anywhere outside '#menu' div
    if (e.target.closest("#menu") === null) {
      setShowMenu(false);
    }
  };

  const menu = (
    <nav
      dir="ltr"
      className="fixed top-14 left-0 w-screen bg-brown-50 p-4 pb-2 border-b-2 border-brown shadow-lg"
    >
      <ul>{/* Menu links */}</ul>
      <ul className="pt-2 flex items-center justify-center border-t border-brown-200">
        {locales.map((loc) => {
          return (
            <li
              key={loc}
              className={`py-2 px-4 mx-2 rounded-md ${
                loc === locale ? "bg-red text-red-50" : ""
              }`}
            >
              <Link href="" locale={loc}>
                {localesName[loc]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div id="menu" className="h-10">
      <button
        className="h-10 w-10 focus:outline-none text-brown-200"
        onClick={toggleMenu}
      >
        <Icon name={showMenu ? "close" : "menu"} box="6" />
      </button>

      {showMenu && menu}
    </div>
  );
}
