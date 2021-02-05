const axios = require("axios").default;

export default async (req, res) => {
  let params = "";

  for (let param in req.body) {
    let tempParam = req.body[param];

    if (tempParam) {
      if (param === "sort") {
        params += `&${tempParam}=1`;
      } else {
        params += tempParam !== "all" ? `&${param}=${tempParam}` : "";
      }
    }
  }

  // return res.json(params);

  const url = encodeURI(
    `https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}&client_secret=${process.env.FS_SECRET}${params}&sortByPopularity=1&day=any&time=any&v=20210115`
  );

  return axios
    .get(url)
    .then((response) => res.json(response.data))
    .catch((e) => {
      res.json(e.response.data);
    });
};
