import { useIntl } from "react-intl";

import Loader from "../../utils/Loader";
import Icon from "../../utils/Icon";

import SettingsTab from "./SettingsTab";
import InfoTab from "./InfoTab";

export default function Tabs({
  isLoading,
  activeTab,
  setActiveTab,
  total,
  recent,
  clearRecent,
}) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const tabs = ["info", "settings", "history", "bookmark"];

  const tabBody = {
    info: isLoading ? (
      <Loader className="text-gray-400 h-4 my-4" />
    ) : (
      <InfoTab total={total} />
    ),
    settings: <SettingsTab setActiveTab={setActiveTab} t={t} />,
    history: <HistoryTab recent={recent} clearRecent={clearRecent} t={t} />,
    bookmark: "Bookmarked venues [WIP]",
  };

  return (
    <div
      id="tabs"
      className="flex-shrink-0 bg-gray-50 rounded-lg shadow hover:shadow-md overflow-hidden"
    >
      <ul
        id="tab-switcher"
        className={`flex ${
          locale === "ar" ? "divide-x-reverse" : ""
        } w-full pattern-dark divide-x-2 divide-gray-600`}
      >
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 h-10 flex justify-center items-center cursor-pointer"
          >
            <Icon
              name={tab}
              className={`h-5 w-5 ${
                tab === activeTab ? "text-yellow" : "text-gray-500"
              }`}
            />
          </li>
        ))}
      </ul>
      <div className="min-h-16 flex justify-center items-center">
        {tabBody[activeTab]}
      </div>
    </div>
  );
}

function HistoryTab({ recent, clearRecent, t }) {
  return (
    <div className="flex flex-col py-4 px-2 text-center">
      <div>
        {t("explore.history.msg")}(
        <span className="text-red-500 tracking-wider font-bold">
          {recent?.length}
        </span>
        )
      </div>

      {recent?.length > 0 && (
        <div id="clear-recent" className="text-center pt-4">
          <button
            className="btn-outlined text-gray-700"
            onClick={() => clearRecent()}
          >
            {t("explore.history.clear")}
          </button>
        </div>
      )}
    </div>
  );
}
