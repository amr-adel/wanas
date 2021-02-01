import { useEffect } from "react";
import Head from "next/head";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import FourSquare from "../components/FourSquare";
import { useStore } from "../hooks/useStore";

export default function Explore() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  const router = useRouter();

  const { reqParams } = useStore((state) => state.fourSquare);

  useEffect(() => {
    if (reqParams.ll) {
      router.push(
        {
          pathname: "/explore",
          query: {
            ll: reqParams.ll.join("_"),
            section: reqParams.section,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [reqParams]);

  return (
    <div className="min-h-inner bg-repeat pt-72 flex flex-col">
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <div
        id="map"
        className="h-64 w-full fixed top-14 flex items-center justify-center bg-yellow-100"
      >
        MAP
      </div>

      <div
        id="foursquare-container"
        className="h-full w-full p-4 relative flex-1 flex flex-col border-t-2 border-gray-100 pattern-light rounded-t-2xl"
      >
        <FourSquare />
      </div>
    </div>
  );
}
