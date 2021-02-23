import { useStore } from "../../hooks/useStore";

export default function InfoTab({ total, t }) {
  const {
    localeNear,
    reqParams: { section, near },
  } = useStore((state) => state.fourSquare);

  let msg = "";

  if (total === undefined) {
    msg = t("explore.info.start");
  } else if (total === 0) {
    msg = t("explore.info.zero");
  } else {
    msg = (
      <h1>
        <span className="text-red-500">{total}</span>
        {t("explore.info.venues")}
        {localeNear || near ? t("explore.info.near") : ""}
        {localeNear || near ? (
          <span className="text-red-500">{localeNear || near}</span>
        ) : (
          ""
        )}
        {section !== "all" ? t("explore.info.section") : ""}
        {section !== "all" ? (
          <span className="text-red-500">
            {t(`home.fs-section.${section}`)}
          </span>
        ) : (
          ""
        )}
        .
      </h1>
    );
  }

  return (
    <div id="info-containe4" className="p-4 text-gray-700 text-center">
      {msg}
    </div>
  );
}
