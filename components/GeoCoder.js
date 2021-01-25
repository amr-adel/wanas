import { useState } from "react";
import { useIntl } from "react-intl";
import Icon from "./Icon";

export default function GeoCoder() {
  const [focused, setFocused] = useState(false);

  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div
      id="geo-coder"
      className={`p-2 relative transition-width mr-auto rounded-md ${
        focused
          ? "bg-brown-50 shadow-lg w-full rounded-b-none"
          : "w-9/12 bg-brown-100"
      }`}
    >
      <label className="flex justify-center text-brown-200">
        <Icon name="search-location" box="6" classes="flex-shrink-0" />
        <input
          type="text"
          dir={locale === "ar" ? "rtl" : "ltr"}
          placeholder={t("geoCoderPlaceholder")}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-full w-20 leading-6 bg-transparent ml-2 pl-2 flex-1 focus:outline-none placeholder-brown-300 text-brown text-lg border-l border-brown-100"
        />
      </label>

      {focused && (
        <div
          id="results"
          className="absolute top-10 left-0 right-0 p-2 bg-brown-50 border-t border-brown-100 rounded-b-md shadow-lg"
        >
          <ol className="flex flex-col">
            <li className="flex flex-col px-2 py-1 mb-2 bg-white rounded-md">
              <h5 className="text-brown text-lg">Cairo</h5>
              <span className="text-brown-300 text-sm">
                Cairo, Cairo, Egypt
              </span>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
