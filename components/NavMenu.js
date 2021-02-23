import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Link from "next/link";

import Icon from "../utils/Icon";
import LocaleSwitcher from "./LocaleSwitcher";

export default function NavMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const { formatMessage, locale } = useIntl();
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
    // Hide menu on clicking anywhere outside '#menu' div, or on a <span /> or <button />
    if (
      e.target.closest("#menu") === null ||
      ["SPAN", "BUTTON"].indexOf(e.target.tagName) !== -1
    ) {
      setShowMenu(false);
    }
  };

  const menuLinksClasses = `w-full block p-2 rounded-lg cursor-pointer transition-padding last:px-0 ${
    locale === "ar" ? "hover:pr-4" : "hover:pl-4"
  }`;

  const menu = (
    <nav
      dir="ltr"
      className={`w-72 absolute top-2 right-2 p-4 pt-10 flex flex-col text-gray-500 bg-gray-200 divide-y divide-gray-300 rounded-lg shadow-lg`}
    >
      <ul
        dir="auto"
        className="felx flex-col px-2 text-xl rounded-lg bg-gray-50 divide-y divide-gray-200 shadow hover:shadow-md"
      >
        <li key="home" className="my-1.5">
          <Link href="/">
            <span className={menuLinksClasses}>{t("menu.home")}</span>
          </Link>
        </li>
        <li key="explore" className="my-1.5">
          <Link href="/explore">
            <span className={menuLinksClasses}>{t("menu.explore")}</span>
          </Link>
        </li>
        <li key="about" className="my-1.5">
          <Link href="/about">
            <span className={menuLinksClasses}>{t("menu.about")}</span>
          </Link>
        </li>
      </ul>

      <div id="locale-switcher-container" className="pt-2 mt-2">
        <LocaleSwitcher />
      </div>
    </nav>
  );

  return (
    <div id="menu" className="h-full w-full p-2 relative">
      <button
        className={`relative h-full rounded-lg w-full focus:outline-none flex justify-center items-center ${
          showMenu ? " text-gray-400" : "text-inherit"
        } z-40`}
        onClick={toggleMenu}
      >
        <Icon name={showMenu ? "close" : "menu"} classes="h-6" />
      </button>

      {showMenu && menu}
    </div>
  );
}
