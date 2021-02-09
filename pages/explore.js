import { useEffect } from "react";
import Head from "next/head";

import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { useStore } from "../hooks/useStore";

import FourSquare from "../components/FourSquare";
import Map from "../components/Map";

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

      <Map />

      <div
        id="results-container"
        className="h-full w-full p-4 relative flex-1 flex flex-col border-t-2 border-gray-100 pattern-light rounded-t-2xl"
      >
        <FourSquare />
      </div>
    </div>
  );
}
