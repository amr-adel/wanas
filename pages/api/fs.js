const axios = require("axios").default;

export default async (req, res) => {
  const { ll, locale } = req.query;

  return axios
    .get(
      `https://api.foursquare.com/v2/venues/explore?client_id=${process.env.FS_ID}&client_secret=${process.env.FS_SECRET}&v=20210115&locale=${locale}&ll=${ll}&limit=20&sortByPopularity=1&day=any&time=any`
      // "https://api.foursquare.com/v2/venues/explore?client_id=VSZ1VB353GR44SUUGWEBZK2JT2DAJHZ3JKMLQXIKICUCX3MZ&client_secret=EUZ5KK11TBGAIHJIG5SSGNNMCSILFEQ3KKY13LCURMJPB1K4&v=20210115&locale=en&ll=40.41889,-3.69194&limit=20"
    )
    .then((response) => res.json(response.data))
    .catch((e) => {
      res.json(e.response.data);
    });
};
