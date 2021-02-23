import { useEffect } from "react";
import Head from "next/head";
import { useStore } from "../hooks/useStore";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import Map from "../components/Map";
import FourSquare from "../components/FourSquare";

export default function Explore() {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  const router = useRouter();

  const { reqParams } = useStore((state) => state.fourSquare);
  const set = useStore((state) => state.set);

  // Sync reqParams with URL
  useEffect(() => {
    if (
      reqParams.ll === null &&
      reqParams.near === null &&
      router.asPath !== "/explore"
    ) {
      // Get reqParams from URL
      const paramsFromUrl = reqParamsFromQueryString(router.asPath);

      set((state) => {
        state.fourSquare.reqParams = { ...reqParams, ...paramsFromUrl };
      });
    } else {
      // Shallow update URL
      router.push(
        {
          pathname: "/explore",
          query: reqParamsToQueryString(reqParams),
        },
        undefined,
        { shallow: true }
      );
    }
  }, [reqParams]);

  return (
    <div className="min-h-inner pt-16 pb-4 px-2 flex flex-col space-y-4 pattern-light">
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <Map withGeoCoder />

      <FourSquare />
    </div>
  );
}

function reqParamsToQueryString(reqParams) {
  const changedParams = {};

  for (let param in reqParams) {
    if (param === "section" && reqParams[param] !== "all")
      changedParams[param] = reqParams[param];
    else if (param === "ll" && reqParams[param] !== null)
      changedParams[param] = reqParams[param].join("_");
    else if (param === "near" && reqParams[param] !== null)
      changedParams[param] = reqParams[param].replace(", ", "_");
    else if (param === "radius" && reqParams[param] !== "auto")
      changedParams[param] = reqParams[param];
    else if (param === "limit" && reqParams[param] !== 15)
      changedParams[param] = reqParams[param];
    else if (param === "offset" && reqParams[param] !== 0)
      changedParams[param] = reqParams[param];
    else if (param === "sort" && reqParams[param] !== "auto")
      changedParams[param] = reqParams[param];
  }

  return changedParams;
}

function reqParamsFromQueryString(query) {
  const stringParams = query.split("?")?.[1]?.split("&") || null;

  const reqParams = {};

  stringParams?.forEach((paramString) => {
    const [param, value] = paramString.split("=");

    if (
      param === "section" &&
      ["food", "drinks", "coffee", "shops", "arts", "outdoors"].includes(value)
    ) {
      reqParams[param] = value;
    } else if (param === "ll") {
      reqParams[param] = value.split("_").map((str) => Number(str));
    } else if (param === "near") {
      reqParams[param] = value.replace("_", ", ");
    } else if (param === "radius" && ["5", "10", "20"].includes(value)) {
      reqParams[param] = Number(value);
    } else if (param === "limit" && ["30", "50"].includes(value)) {
      reqParams[param] = Number(value);
    } else if (param === "offset") {
      reqParams[param] = Number(value);
    } else if (param === "sort" && ["popularity", "distance"].includes(value)) {
      reqParams[param] = value;
    }
  });

  return reqParams;
}
