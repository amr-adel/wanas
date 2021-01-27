import Head from "next/head";
import { useState } from "react";
import { useIntl } from "react-intl";

import GeoCoder from "../components/GeoCoder";
import NavMenu from "../components/NavMenu";
import FourSquare from "../components/FourSquare";

export default function Home() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  // App state
  const [center, setCenter] = useState([0, 0]);
  const [venues, setVenues] = useState([]);

  return (
    <div>
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <header
        dir="ltr"
        className="flex p-2 h-14 bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md"
      >
        <GeoCoder setCenter={setCenter} />
        <NavMenu />
      </header>

      <div className="w-full h-64 bg-yellow flex justify-center items-center fixed top-14 text-brown-50">
        MAP
      </div>

      <FourSquare center={center} setVenues={setVenues} />
    </div>
  );
}
