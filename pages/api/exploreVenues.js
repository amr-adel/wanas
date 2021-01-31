const axios = require("axios").default;

export default async (req, res) => {
  const { ll, locale } = req.query;

  return axios
    .get(
      `https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}&client_secret=${process.env.FS_SECRET}&v=20210115&locale=${locale}&ll=${ll}&limit=20&sortByPopularity=1&day=any&time=any`
    )
    .then((response) => res.json(response.data))
    .catch((e) => {
      res.json(e.response.data);
    });
};
