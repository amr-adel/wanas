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
    <main className="container pt-96 md:pt-16 pb-4 md:min-h-inner w-full md:flex md:flex-col lg:flex-row md:justify-center md:items-center">
      <div
        id="brand"
        className="fixed md:relative h-80 md:h-auto pt-4 lg:pt-0 top-12 md:top-auto left-0 right-0 flex flex-col justify-center items-center mx-auto md:mb-12 lg:m-20"
      >
        <Logo className="h-44 w-32 mb-6" />
        <Logo type="text" className="h-12 w-52" />
      </div>

      <div className="px-4 md:max-w-md pattern-dark rounded-lg shadow-lg relative z-10">
        <div
          id="select-section"
          className="mx-auto py-4 border-b border-gray-600"
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
          className="max-w-sm mx-auto py-4 flex flex-col items-center"
        >
          <h3 className="mb-2 text-xl text-center text-gray-200">
            {t("home.looking-in")}
          </h3>
          <GeoCoder />
        </div>
      </div>
    </main>
  );
}
