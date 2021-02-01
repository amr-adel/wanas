const axios = require("axios").default;

export default async (req, res) => {
  let params = "";

  for (let param in req.query) {
    params += `&${param}=${req.query[param]}`;
  }

  return axios
    .get(
      `https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}&client_secret=${process.env.FS_SECRET}&${params}&sortByPopularity=1&day=any&time=any&v=20210115`
    )
    .then((response) => res.json(response.data))
    .catch((e) => {
      res.json(e.response.data);
    });
};
