import Head from "next/head";
import { useIntl } from "react-intl";
import { useStore } from "../hooks/useStore";

import Logo from "../utils/Logo";
import GeoCoder from "../components/GeoCoder";

export default function Home() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const section = useStore((state) => state.fourSquare.reqParams.section);
  const { sections } = useStore((state) => state.fourSquare);
  const set = useStore((state) => state.set);

  const handleChangeSection = (sec) => {
    set((state) => {
      state.fourSquare.reqParams.section = sec;
    });
  };

  return (
    <>
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      {/* <div
        id="brand"
        className="flex flex-col justify-center items-center my-8 md:w-2/5 md:flex-shrink-0"
      >
        <Logo className="h-32 mb-4" />
        <Logo type="text" className="h-8 " />
      </div> */}

      <div className="p-2 pattern-dark rounded-lg shadow-lg md:w-full">
        <div
          id="select-section"
          className="max-w-sm mx-auto p-4 border-b border-gray-600"
        >
          <h3 className="mb-2 text-xl text-center text-gray-200">
            {t("home.looking-for")}
          </h3>
          <ul className="flex flex-wrap justify-center">
            {sections.map((sec) => (
              <li key={sec}>
                <button
                  onClick={() => handleChangeSection(sec)}
                  className={`btn my-1 mx-2 ${
                    sec === section
                      ? "bg-red-500 text-gray-200"
                      : "bg-gray-700 text-gray-400"
                  } capitalize`}
                >
                  {t(`home.fs-section.${sec}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          id="select-city"
          className="max-w-sm mx-auto py-4 px-2 flex flex-col items-center"
        >
          <h3 className="mb-2 text-xl text-center text-gray-200">
            {t("home.looking-in")}
          </h3>
          <GeoCoder />
        </div>
      </div>
    </>
  );
}
