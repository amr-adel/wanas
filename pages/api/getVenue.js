const axios = require("axios").default;

export default async (req, res) => {
  const { vid, locale } = req.query;

  return axios
    .get(
      `https://api.foursquare.com/v2/venues/${vid}?client_id=${process.env.FS_ID}&client_secret=${process.env.FS_SECRET}&locale=${locale}&v=20210115`
    )
    .then((response) => res.json(response.data))
    .catch((e) => {
      res.json(e.response.data);
    });
};
