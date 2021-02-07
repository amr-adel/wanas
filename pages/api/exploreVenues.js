const axios = require("axios").default;

export default async (req, res) => {
  let params = "";

  for (let param in req.body) {
    let tempParam = req.body[param];

    if (tempParam && tempParam !== "auto" && tempParam !== "all") {
      if (param === "sort") {
        params += `&${
          tempParam === "popularity" ? "sortByPopularity" : "sortByDistance"
        }=1`;
      } else if (param === "radius") {
        params += `&${param}=${tempParam * 1000}`;
      } else {
        params += `&${param}=${tempParam}`;
      }
    }
  }

  // return res.json(params);

  const url = encodeURI(
    `https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}&client_secret=${process.env.FS_SECRET}${params}&day=any&time=any&v=20210115`
  );

  return axios
    .get(url)
    .then((response) => res.json(response.data))
    .catch((e) => {
      res.json(e.response.data);
    });
};
