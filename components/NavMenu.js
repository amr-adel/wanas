import { useState } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import Link from "next/link";

import Icon from "./Icon";

export default function NavMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const { locale, locales } = useRouter();
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  const toggleMenu = () => setShowMenu(!showMenu);

  const menu = (
    <nav dir="ltr" className="fixed top-14 left-0 w-screen bg-yellow-100 p-4">
      <ul>
        <li>Home</li>
        <li>Login/Sign up</li>
        <li>About</li>
      </ul>
      <ul>
        {locales.map((loc) => {
          return (
            <li>
              <Link href="" locale={loc}>
                {loc}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div className="h-10">
      <button
        className="h-10 w-10 focus:outline-none text-gray-700"
        onClick={toggleMenu}
      >
        <Icon name={showMenu ? "close" : "menu"} box="6" />
      </button>

      {showMenu && menu}
    </div>
  );
}
