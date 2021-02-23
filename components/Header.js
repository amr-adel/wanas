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
      <div className="lg:container flex justify-between items-start h-12">
        <Logo classes="w-12 h-12 p-2" />
        <Logo type="text" classes="h-12 py-3" />

        <div id="nav-container" className="h-12 w-12">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
