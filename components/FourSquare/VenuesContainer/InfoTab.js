import { useStore } from "../../../hooks/useStore";
import { useIntl } from "react-intl";

export default function InfoTab({ total }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const {
    nearLabels,
    reqParams: { section, near },
  } = useStore((state) => state.fourSquare);

  // Create response summary as a string
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
        {(nearLabels?.[locale] || near) && (
          <>
            {t("explore.info.near")}
            <span className="text-red-500">{nearLabels?.[locale] || near}</span>
          </>
        )}
        {section !== "all" && (
          <>
            {t("explore.info.section")}
            <span className="text-red-500">
              {t(`home.fs-section.${section}`)}
            </span>
          </>
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
