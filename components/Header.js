import { useIntl } from "react-intl";

import Logo from "../utils/Logo";
import GeoCoder from "../components/GeoCoder";
import NavMenu from "../components/NavMenu";

export default function Header() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <header
      dir="ltr"
      className="fixed top-0 left-0 bg-gray-100 w-full z-30 shadow-md"
    >
      <div
        className={`container flex justify-between items-center h-12 lg:justify-start ${
          locale === "ar" && "lg:flex-row-reverse"
        }`}
      >
        <Logo classes="w-8 h-8 lg:mx-1" />
        <Logo
          type="text"
          classes={`h-8 py-1 ${locale === "ar" ? "lg:ml-auto" : "lg:mr-auto"}`}
        />

        <div id="nav-container" className="h-8 lg:h-full w-8 lg:w-auto">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
