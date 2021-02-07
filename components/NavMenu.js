import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Link from "next/link";

import Icon from "../utils/Icon";
import LocaleSwitcher from "./LocaleSwitcher";

export default function NavMenu() {
  const [showMenu, setShowMenu] = useState(false);
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
      className="fixed top-14 left-0 w-screen bg-gray-50 p-4 pb-2 border-b-2 border-gray-700 rounded-b-lg shadow-lg"
    >
      <ul className="mb-2 felx flex-col text-center border-b border-gray-200 text-xl">
        <li key="home" className="p-2 my-2">
          <Link href="/">Home</Link>
        </li>
        <li key="explore" className="p-2 my-2">
          <Link href="/explore">Explore</Link>
        </li>
      </ul>
      <LocaleSwitcher />
    </nav>
  );

  return (
    <div id="menu" className="h-10">
      <button
        className="h-10 w-10 focus:outline-none text-gray-200"
        onClick={toggleMenu}
      >
        <Icon name={showMenu ? "close" : "menu"} classes="h-6 w-6 mx-auto" />
      </button>

      {showMenu && menu}
    </div>
  );
}
