import { useState } from "react";
import { useStore } from "../../../hooks/useStore";

export default function SettingsTab({ setActiveTab, t }) {
  const { sections, reqParams } = useStore((state) => state.fourSquare);
  const set = useStore((state) => state.set);

  const [settings, setSettings] = useState(reqParams);

  const handleChange = (param, value) => {
    setSettings({ ...settings, [param]: value });
  };

  const updateSearchParams = () => {
    setActiveTab("info");
    set((state) => {
      state.fourSquare.reqParams = { ...settings, offset: 0 };
    });
  };

  return (
    <div
      id="settings-body"
      className="flex flex-col p-4 divide-y divide-gray-200"
    >
      {/* Select section */}
      <div id="select-section" className="py-2 mb-2">
        <h6 className="text-gray-500 mb-2">{t("explore.settings.sections")}</h6>
        <ul className="flex flex-wrap justify-center">
          {sections.map((sec) => (
            <li key={sec}>
              <button
                onClick={() => handleChange("section", sec)}
                className={`btn my-1 mx-2 text-sm ${
                  sec === settings.section ? "bg-red-500" : "bg-gray-700"
                } text-gray-200 capitalize`}
              >
                {t(`home.fs-section.${sec}`)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Select radius */}
      <div id="select-radius" className="py-2 mb-2">
        <h6 className="text-gray-500  mb-2">{t("explore.settings.radius")}</h6>
        <ul className="flex flex-wrap justify-center">
          {["auto", 5, 10, 20].map((rad) => (
            <li key={rad}>
              <button
                onClick={() => handleChange("radius", rad)}
                className={`btn my-1 mx-2 text-sm ${
                  rad === settings.radius ? "bg-red-500" : "bg-gray-700"
                } text-gray-200 capitalize`}
              >
                {rad === "auto"
                  ? t("explore.settings.auto")
                  : `${rad + t("explore.settings.radius.unit")}`}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Select limit */}
      <div id="select-limit" className="py-2 mb-2">
        <h6 className="text-gray-500  mb-2">{t("explore.settings.limit")}</h6>
        <ul className="flex flex-wrap justify-center">
          {[15, 30, 50].map((limit) => (
            <li key={limit}>
              <button
                onClick={() => handleChange("limit", limit)}
                className={`btn my-1 mx-2 text-sm ${
                  limit === settings.limit ? "bg-red-500" : "bg-gray-700"
                } text-gray-200`}
              >
                {limit}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Select sort */}
      <div id="select-sort" className="py-2 mb-2">
        <h6 className="text-gray-500  mb-2">{t("explore.settings.sort")}</h6>
        <ul className="flex flex-wrap justify-center">
          {["auto", "popularity", "distance"].map((sortBy) => (
            <li key={`sort-${sortBy}`}>
              <button
                onClick={() => handleChange("sort", sortBy)}
                className={`btn my-1 mx-2 text-sm ${
                  sortBy === settings.sort ? "bg-red-500" : "bg-gray-700"
                } text-gray-200 capitalize`}
              >
                {t(
                  `explore.settings.${
                    sortBy === "auto" ? "auto" : `sort.${sortBy}`
                  }`
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div id="confirm-change" className="text-center pt-4">
        <button
          className="btn-outlined text-gray-700"
          onClick={updateSearchParams}
        >
          {t("explore.settings.confirm")}
        </button>
      </div>
    </div>
  );
}
