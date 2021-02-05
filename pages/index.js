import Head from "next/head";
import { useIntl } from "react-intl";
import Link from "next/link";

import Logo from "../utils/Logo";
import GeoCoder from "../components/GeoCoder";
import { useStore } from "../hooks/useStore";

const fourSquareSections = [
  "all",
  "food",
  "drinks",
  "coffee",
  "shops",
  "arts",
  "outdoors",
];

export default function Home() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  const section = useStore((state) => state.fourSquare.reqParams.section);
  const set = useStore((state) => state.set);

  const handleChangeSection = (sec) => {
    set((state) => {
      state.fourSquare.reqParams.section = sec;
    });
  };

  return (
    <div className="min-h-inner bg-repeat pt-72 flex flex-col">
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <div
        id="branding"
        className="p-4 pb-6 fixed top-0 flex flex-col h-80 w-full justify-center bg-gray-200"
      >
        <Logo classes="h-32 mb-4" />
        <Logo type="text" classes="h-8" />
      </div>

      <div className="h-full w-full p-4 flex-1 flex flex-col border-t-2 border-gray-600 pattern-dark rounded-t-2xl relative">
        <div id="select-section" className="p-4 border-b border-gray-600">
          <h3 className="mb-2 text-xl text-center text-gray-200">
            {t("home.looking-for")}
          </h3>
          <ul className="flex flex-wrap justify-center">
            {fourSquareSections.map((sec) => (
              <li key={sec}>
                <button
                  onClick={() => handleChangeSection(sec)}
                  className={`btn my-1 mx-2 ${
                    sec === section ? "bg-red-500" : "bg-gray-700"
                  } text-gray-200 capitalize`}
                >
                  {t(`home.fs-section.${sec}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div id="select-city" className="py-4 px-2 flex flex-col items-center">
          <h3 className="mb-2 text-xl text-center text-gray-200">
            {t("home.looking-in")}
          </h3>
          <GeoCoder />

          {/* <Link href="/explore">
            <span className="text-xl text-gray-200">Explore</span>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
