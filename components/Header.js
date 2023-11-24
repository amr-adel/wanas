import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "../utils/Logo";
import NavMenu from "../components/NavMenu";

export default function Header() {
  const { locale } = useRouter();

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
        <Link href="/" className="cursor-pointer lg:mx-1">
          <Logo className="w-8 h-8" />
        </Link>

        <Link
          href="/"
          className={`cursor-pointer ${
            locale === "ar" ? "lg:ml-auto" : "lg:mr-auto"
          }`}
        >
          <Logo type="text" className={`h-8 py-1`} />
        </Link>

        <div id="nav-container" className="h-8 lg:h-full w-8 lg:w-auto">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
