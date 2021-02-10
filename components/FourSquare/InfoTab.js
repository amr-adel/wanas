import { useStore } from "../../hooks/useStore";

export default function InfoTab({ total, t }) {
  const { section, near, radius } = useStore(
    (state) => state.fourSquare.reqParams
  );

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
        {near ? t("explore.info.near") : ""}
        {near ? <span className="text-red-500">{near}</span> : ""}
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
