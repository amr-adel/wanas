import {
  reqParamsToQueryString,
  reqParamsFromQueryString,
} from "../../../../components/FourSquare/VenuesContainer/syncReqParamasWithUrl";

describe("syncReqParamasWithUrl", () => {
  let reqParams;

  beforeEach(() => {
    reqParams = {
      section: "all",
      ll: null,
      near: null,
      radius: "auto",
      limit: 15,
      offset: 0,
      sort: "auto",
    };
  });

  describe("reqParamsToQueryString", () => {
    it("Should omit default values.", () => {
      const queryObj = reqParamsToQueryString(reqParams);

      expect(queryObj).toStrictEqual({});
    });

    it("Should output changed values.", () => {
      reqParams.section = "arts";
      reqParams.radius = 20;
      reqParams.limit = 30;
      reqParams.offset = 15;
      reqParams.sort = "distance";

      const queryObj = reqParamsToQueryString(reqParams);

      expect(queryObj).toStrictEqual({
        section: "arts",
        radius: 20,
        limit: 30,
        offset: 15,
        sort: "distance",
      });
    });

    it("Should join 'll' and replace ', ' with '_'.", () => {
      reqParams.ll = [12.34567, 76.54321];
      reqParams.near = "Cairo, eg";

      const queryObj = reqParamsToQueryString(reqParams);

      expect(queryObj).toStrictEqual({
        ll: "12.34567_76.54321",
        near: "Cairo_eg",
      });
    });
  });

  describe("reqParamsFromQueryString", () => {
    it("Should only extract reqPqrams from a valid URL.", () => {
      const query = "https://wanas.vercel.app/";

      const reqParamsObj = reqParamsFromQueryString(query);

      expect(reqParamsObj).toStrictEqual({});
    });

    it("Should omit unrecognized values.", () => {
      const query =
        "https://wanas.vercel.app/explore?section=unrecognized&radius=unrecognized&limit=unrecognized&sort=unrecognized";

      const reqParamsObj = reqParamsFromQueryString(query);

      expect(reqParamsObj).toStrictEqual({});
    });

    it("Should replace '_' with ', ', and convert 'll' to Array of Numbers.", () => {
      const query =
        "https://wanas.vercel.app/explore?ll=30.05611_31.23944&near=Cairo_eg";

      const reqParamsObj = reqParamsFromQueryString(query);

      expect(reqParamsObj).toStrictEqual({
        ll: [30.05611, 31.23944],
        near: "Cairo, eg",
      });
    });

    it("Should create reqParamsObj from a valid URL, and correct types.", () => {
      const query =
        "https://wanas.vercel.app/explore?ll=30.05611_31.23944&near=Cairo_eg&section=arts&radius=10&limit=30&offset=15&sort=popularity";

      const reqParamsObj = reqParamsFromQueryString(query);

      expect(reqParamsObj).toStrictEqual({
        ll: [30.05611, 31.23944],
        near: "Cairo, eg",
        section: "arts",
        radius: 10,
        limit: 30,
        offset: 15,
        sort: "popularity",
      });
    });
  });
});
