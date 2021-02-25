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

  const menuLinksclassName = `w-full block p-2 rounded-lg cursor-pointer transition-padding hover:text-gray-700 lg:text-base`;

  const menu = (
    <nav
      dir="ltr"
      className={`${
        showMenu ? "flex" : "hidden lg:flex"
      } w-72 lg:w-auto absolute lg:relative top-0 right-0 p-4 lg:p-0 pt-8 lg:pt-1 flex-col  text-gray-500 bg-gray-200 lg:bg-transparent rounded-lg shadow-lg lg:shadow-none ${
        locale === "ar"
          ? "lg:flex-row-reverse lg:space-x-reverse"
          : "lg:flex-row lg:space-x-2"
      }`}
    >
      <ul
        dir="auto"
        className={`flex flex-col lg:flex-row px-2 lg:px-0 text-xl rounded-lg bg-gray-50 lg:bg-transparent divide-y lg:divide-y-0 divide-gray-200 shadow lg:shadow-none hover:shadow-md lg:hover:shadow-none lg:space-x-4`}
      >
        <li key="home">
          <Link href="/">
            <span className={menuLinksclassName}>{t("menu.home")}</span>
          </Link>
        </li>
        <li key="explore">
          <Link href="/explore">
            <span className={menuLinksclassName}>{t("menu.explore")}</span>
          </Link>
        </li>
        <li key="about">
          <Link href="/about">
            <span className={menuLinksclassName}>{t("menu.about")}</span>
          </Link>
        </li>
      </ul>

      <div
        id="locale-switcher-container"
        className="bg-gray-50 lg:bg-transparent lg:hover:bg-gray-50 rounded-lg shadow lg:shadow-none hover:shadow-md mt-4 lg:mt-0 lg:h-12 lg:hover:h-auto lg:focus:h-auto lg:overflow-hidden"
      >
        <LocaleSwitcher menu />
      </div>
    </nav>
  );

  return (
    <div id="menu" className="h-full w-full relative">
      <button
        className={`relative h-full rounded-lg w-full focus:outline-none flex justify-center items-center ${
          showMenu ? " text-gray-400" : "text-inherit"
        } z-40 lg:hidden`}
        onClick={toggleMenu}
      >
        <Icon name={showMenu ? "close" : "menu"} className="h-6" />
      </button>

      {menu}
    </div>
  );
}
