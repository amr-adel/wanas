import { useIntl } from "react-intl";

export default function GeoCoder() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <div id="geo-coder" className="w-full">
      <label className="h-5 rounded-md">
        <input
          type="text"
          id="name"
          dir={locale === "ar" ? "rtl" : "ltr"}
          placeholder={t("geoCoderPlaceholder")}
        />
      </label>
    </div>
  );
}
