import { useIntl } from "react-intl";

import { useStore } from "../../../hooks/useStore";
import Icon from "../../../utils/Icon";

export default function Pagination({ total }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const { limit, offset } = useStore((state) => state.fourSquare.reqParams);
  const set = useStore((state) => state.set);

  if (!total || total === 0 || total <= limit) {
    return null;
  } else {
    return (
      total &&
      total > limit && (
        <div
          id="pagination"
          className={`h-12 fixed left-2 right-2 bottom-2 md:sticky md:top-0 z-10 flex items-center flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden shadow`}
        >
          <button
            id="prev"
            disabled={!offset}
            className="disabled:text-gray-500 text-yellow focus:outline-none"
            onClick={() =>
              set((state) => {
                state.fourSquare.reqParams.offset -= limit;
              })
            }
          >
            <Icon
              name={locale === "ar" ? "right" : "left"}
              className="h-12 w-12 p-2 pattern-dark"
            />
          </button>

          <span className="flex-1 text-center text-gray-700 font-bold tracking-widest">
            {offset + 1} : {limit + offset > total ? total : limit + offset} (
            <span className="text-gray-400">{total}</span>)
          </span>

          <button
            id="next"
            disabled={offset + limit >= total}
            className="disabled:text-gray-500 text-yellow focus:outline-none"
            onClick={() =>
              set((state) => {
                state.fourSquare.reqParams.offset += limit;
              })
            }
          >
            <Icon
              name={locale !== "ar" ? "right" : "left"}
              className="h-12 w-12 p-2 pattern-dark"
            />
          </button>
        </div>
      )
    );
  }
}
