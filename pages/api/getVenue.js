const axios = require("axios").default;

export default async (req, res) => {
  const { vid } = req.query;

  // return axios
  //   .get(
  //     `https://api.foursquare.com/v2/venues/${vid}?client_id=${process.env.FS_ID}&client_secret=${process.env.FS_SECRET}&v=20210115`
  //   )
  //   .then((response) => res.json(response.data))
  //   .catch((e) => {
  //     res.json(e.response.data);
  //   });

  return res.json(venue);
};

const venue = {
  meta: {
    code: 200,
    requestId: "6014105191b0be0bb75b64b7",
  },
  response: {
    venue: {
      id: "4ee2696393ad88a6bed30288",
      name: "Naguib Mahfouz Cafe (مقهى نجيب محفوظ)",
      contact: {
        phone: "+20225903788",
        formattedPhone: "+20 2 25903788",
        facebook: "321227958085509",
        facebookUsername: "KhanElKhaliliRestaurantAndCafe",
        facebookName:
          'Khan El Khalili Restaurant & Naguib Mahfouz Café "operated by Oberoi Group"',
      },
      location: {
        address: "5 El Badestan Lane - Khan Al-Khalili",
        crossStreet: "Al Hussain",
        lat: 30.047963,
        lng: 31.261567,
        labeledLatLngs: [
          {
            label: "display",
            lat: 30.047963,
            lng: 31.261567,
          },
        ],
        cc: "EG",
        neighborhood: "Islamic Cairo",
        city: "القاهرة الإسلامية",
        state: "القاهرة",
        country: "مصر",
        formattedAddress: [
          "5 El Badestan Lane - Khan Al-Khalili (Al Hussain)",
          "القاهرة الإسلامية",
          "القاهرة",
          "مصر",
        ],
      },
      canonicalUrl:
        "https://foursquare.com/v/naguib-mahfouz-cafe--%D9%85%D9%82%D9%87%D9%89-%D9%86%D8%AC%D9%8A%D8%A8-%D9%85%D8%AD%D9%81%D9%88%D8%B8/4ee2696393ad88a6bed30288",
      categories: [
        {
          id: "4bf58dd8d48988d16d941735",
          name: "Café",
          pluralName: "Cafés",
          shortName: "Café",
          icon: {
            prefix: "https://ss3.4sqi.net/img/categories_v2/food/cafe_",
            suffix: ".png",
          },
          primary: true,
        },
        {
          id: "4bf58dd8d48988d119941735",
          name: "Hookah Bar",
          pluralName: "Hookah Bars",
          shortName: "Hookah Bar",
          icon: {
            prefix:
              "https://ss3.4sqi.net/img/categories_v2/nightlife/hookahbar_",
            suffix: ".png",
          },
        },
        {
          id: "4bf58dd8d48988d1e5931735",
          name: "Music Venue",
          pluralName: "Music Venues",
          shortName: "Music Venue",
          icon: {
            prefix:
              "https://ss3.4sqi.net/img/categories_v2/arts_entertainment/musicvenue_",
            suffix: ".png",
          },
        },
      ],
      verified: false,
      stats: {
        tipCount: 131,
      },
      price: {
        tier: 1,
        message: "Cheap",
        currency: "$",
      },
      likes: {
        count: 498,
        groups: [
          {
            type: "others",
            count: 498,
            items: [],
          },
        ],
        summary: "498 Likes",
      },
      dislike: false,
      ok: false,
      rating: 8.8,
      ratingColor: "73CF42",
      ratingSignals: 622,
      menu: {
        type: "Menu",
        label: "Menu",
        anchor: "View Menu",
        url:
          "https://www.elmenus.com/cairo/restaurants/naguib-mahfouz-3525/el-azhar-4288",
        mobileUrl:
          "https://www.elmenus.com/cairo/restaurants/naguib-mahfouz-3525/el-azhar-4288",
        externalUrl:
          "https://www.elmenus.com/cairo/restaurants/naguib-mahfouz-3525/el-azhar-4288",
      },
      allowMenuUrlEdit: true,
      beenHere: {
        count: 0,
        unconfirmedCount: 0,
        marked: false,
        lastCheckinExpiredAt: 0,
      },
      specials: {
        count: 0,
        items: [],
      },
      photos: {
        count: 782,
        groups: [
          {
            type: "venue",
            name: "Venue photos",
            count: 782,
            items: [
              {
                id: "54e4b78b498ebdf2d8fcdf05",
                createdAt: 1424275339,
                source: {
                  name: "Swarm for iOS",
                  url: "https://www.swarmapp.com",
                },
                prefix: "https://fastly.4sqi.net/img/general/",
                suffix:
                  "/72180383_XlY8s4XtSIwmI2PBusFpO1pnDBT89Fv-06ocEJSAUL4.jpg",
                width: 1440,
                height: 1920,
                visibility: "public",
              },
              {
                id: "5830798724ca6a7d84135173",
                createdAt: 1479571847,
                source: {
                  name: "Swarm for iOS",
                  url: "https://www.swarmapp.com",
                },
                prefix: "https://fastly.4sqi.net/img/general/",
                suffix:
                  "/35633342_Iyv4zjVmwSbLZmbruPG4S95jE19H_07H5QxQanK9iO8.jpg",
                width: 1080,
                height: 1920,
                visibility: "public",
              },
            ],
          },
        ],
      },
      reasons: {
        count: 1,
        items: [
          {
            summary: "Lots of people like this place",
            type: "general",
            reasonName: "rawLikesReason",
          },
        ],
      },
      hereNow: {
        count: 0,
        summary: "Nobody here",
        groups: [],
      },
      createdAt: 1323460963,
      tips: {
        count: 131,
        groups: [
          {
            type: "others",
            name: "All tips",
            count: 131,
            items: [
              {
                id: "4f9691c0e4b087d33ee2339e",
                createdAt: 1335267776,
                text: "Lovely atmosphere but a little over priced.",
                type: "user",
                canonicalUrl:
                  "https://foursquare.com/item/4f9691c0e4b087d33ee2339e",
                lang: "en",
                likes: {
                  count: 8,
                  groups: [
                    {
                      type: "others",
                      count: 8,
                      items: [
                        {
                          firstName: "Walid",
                          countryCode: "EG",
                        },
                        {
                          firstName: "Mahmoud",
                          lastName: "H",
                          countryCode: "EG",
                        },
                        {
                          firstName: "AhmR",
                          lastName: "Z",
                          countryCode: "EG",
                        },
                        {
                          firstName: "Amr",
                          lastName: "W",
                          countryCode: "EG",
                        },
                      ],
                    },
                  ],
                  summary: "8 likes",
                },
                logView: true,
                agreeCount: 8,
                disagreeCount: 0,
                todo: {
                  count: 1,
                },
                user: {
                  firstName: "Eman",
                  lastName: "Y",
                  countryCode: "EG",
                },
              },
              {
                id: "509632d7e4b000bd20e00d1e",
                createdAt: 1352020695,
                text:
                  "The best night place ever .. Amazing atmosphere as well as the food and the music as well",
                type: "user",
                canonicalUrl:
                  "https://foursquare.com/item/509632d7e4b000bd20e00d1e",
                lang: "en",
                likes: {
                  count: 3,
                  groups: [
                    {
                      type: "others",
                      count: 3,
                      items: [
                        {
                          firstName: "Mohammed",
                          lastName: "A",
                          countryCode: "SA",
                        },
                        {
                          firstName: "Umnia",
                          lastName: "M",
                          countryCode: "EG",
                        },
                        {
                          firstName: "LoLitta",
                          lastName: ".",
                          countryCode: "AE",
                        },
                      ],
                    },
                  ],
                  summary: "3 likes",
                },
                logView: true,
                agreeCount: 7,
                disagreeCount: 0,
                todo: {
                  count: 1,
                },
                user: {
                  firstName: "Smsm",
                  lastName: "?",
                  countryCode: "SA",
                },
                authorInteractionType: "liked",
              },
            ],
          },
        ],
      },
      shortUrl: "http://4sq.com/uyJk8M",
      timeZone: "Africa/Cairo",
      listed: {
        count: 773,
        groups: [
          {
            type: "others",
            name: "Lists from other people",
            count: 773,
            items: [
              {
                id: "4f440a6de4b05d3b16ac0480",
                name: "Had a Blast @",
                description: "",
                type: "others",
                user: {
                  firstName: "Rana",
                  lastName: "M",
                  countryCode: "GB",
                },
                editable: false,
                public: true,
                collaborative: false,
                url: "/ranamuhamed/list/had-a-blast-",
                canonicalUrl:
                  "https://foursquare.com/ranamuhamed/list/had-a-blast-",
                createdAt: 1329859181,
                updatedAt: 1329862135,
                followers: {
                  count: 7,
                },
                listItems: {
                  count: 6,
                  items: [
                    {
                      id: "v4ee2696393ad88a6bed30288",
                      createdAt: 1329861544,
                    },
                  ],
                },
              },
              {
                id: "5092c972498ecb7e531e0ccb",
                name: "أحلي مطاعم",
                description: "",
                type: "others",
                user: {
                  firstName: "Nahla",
                  lastName: "E",
                  countryCode: "EG",
                },
                editable: false,
                public: true,
                collaborative: false,
                url:
                  "/user/40549485/list/%D8%A3%D8%AD%D9%84%D9%8A-%D9%85%D8%B7%D8%A7%D8%B9%D9%85",
                canonicalUrl:
                  "https://foursquare.com/user/40549485/list/%D8%A3%D8%AD%D9%84%D9%8A-%D9%85%D8%B7%D8%A7%D8%B9%D9%85",
                createdAt: 1351797106,
                updatedAt: 1397385657,
                followers: {
                  count: 16,
                },
                listItems: {
                  count: 23,
                  items: [
                    {
                      id: "v4ee2696393ad88a6bed30288",
                      createdAt: 1351968761,
                    },
                  ],
                },
              },
              {
                id: "55767693498ec48637ae8e88",
                name: "Cairo",
                description: "",
                type: "others",
                user: {
                  firstName: "@ABDUL2ZiZ",
                  countryCode: "SA",
                },
                editable: false,
                public: true,
                collaborative: false,
                url: "/abdul2ziz/list/cairo",
                canonicalUrl: "https://foursquare.com/abdul2ziz/list/cairo",
                createdAt: 1433826963,
                updatedAt: 1455446495,
                followers: {
                  count: 13,
                },
                listItems: {
                  count: 54,
                  items: [
                    {
                      id: "v4ee2696393ad88a6bed30288",
                      createdAt: 1433914897,
                    },
                  ],
                },
              },
              {
                id: "4f68fa1de4b0cfbcf94014dd",
                name: "Egypt for Foodies",
                description: "Cairo, Alexandria, Ismailia, Sharm El-Sheikh",
                type: "others",
                user: {
                  firstName: "Shinnawy",
                  countryCode: "EG",
                },
                editable: false,
                public: true,
                collaborative: false,
                url: "/shinnawy/list/egypt-for-foodies",
                canonicalUrl:
                  "https://foursquare.com/shinnawy/list/egypt-for-foodies",
                createdAt: 1332279837,
                updatedAt: 1608754863,
                followers: {
                  count: 7,
                },
                listItems: {
                  count: 53,
                  items: [
                    {
                      id: "v4ee2696393ad88a6bed30288",
                      createdAt: 1512396050,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      popular: {
        isOpen: false,
        isLocalHoliday: false,
        timeframes: [
          {
            days: "Today",
            includesToday: true,
            open: [
              {
                renderedTime: "5:00 PM–1:00 AM",
              },
            ],
            segments: [],
          },
          {
            days: "Sat",
            open: [
              {
                renderedTime: "5:00 PM–1:00 AM",
              },
            ],
            segments: [],
          },
          {
            days: "Sun",
            open: [
              {
                renderedTime: "6:00 PM–2:00 AM",
              },
            ],
            segments: [],
          },
          {
            days: "Mon–Wed",
            open: [
              {
                renderedTime: "6:00 PM–1:00 AM",
              },
            ],
            segments: [],
          },
          {
            days: "Thu",
            open: [
              {
                renderedTime: "5:00 PM–1:00 AM",
              },
            ],
            segments: [],
          },
        ],
      },
      seasonalHours: [],
      pageUpdates: {
        count: 0,
        items: [],
      },
      inbox: {
        count: 0,
        items: [],
      },
      attributes: {
        groups: [
          {
            type: "price",
            name: "Price",
            summary: "$",
            count: 1,
            items: [
              {
                displayName: "Price",
                displayValue: "$",
                priceTier: 1,
              },
            ],
          },
          {
            type: "reservations",
            name: "Reservations",
            summary: "Reservations",
            count: 3,
            items: [
              {
                displayName: "Reservations",
                displayValue: "Yes",
              },
            ],
          },
          {
            type: "payments",
            name: "Credit Cards",
            summary: "Credit Cards",
            count: 5,
            items: [
              {
                displayName: "Credit Cards",
                displayValue: "Yes",
              },
            ],
          },
          {
            type: "outdoorSeating",
            name: "Outdoor Seating",
            count: 1,
            items: [
              {
                displayName: "Outdoor Seating",
                displayValue: "No",
              },
            ],
          },
          {
            type: "music",
            name: "Music",
            summary: "Live Music",
            count: 3,
            items: [
              {
                displayName: "Live Music",
                displayValue: "Live Music",
              },
            ],
          },
          {
            type: "wifi",
            name: "Wi-Fi",
            summary: "Wi-Fi",
            count: 1,
            items: [
              {
                displayName: "Wi-Fi",
                displayValue: "Yes",
              },
            ],
          },
          {
            type: "serves",
            name: "Menus",
            summary: "Brunch & Dinner",
            count: 8,
            items: [
              {
                displayName: "Brunch",
                displayValue: "Brunch",
              },
              {
                displayName: "Dinner",
                displayValue: "Dinner",
              },
            ],
          },
        ],
      },
      bestPhoto: {
        id: "54e4b78b498ebdf2d8fcdf05",
        createdAt: 1424275339,
        source: {
          name: "Swarm for iOS",
          url: "https://www.swarmapp.com",
        },
        prefix: "https://fastly.4sqi.net/img/general/",
        suffix: "/72180383_XlY8s4XtSIwmI2PBusFpO1pnDBT89Fv-06ocEJSAUL4.jpg",
        width: 1440,
        height: 1920,
        visibility: "public",
      },
      colors: {
        highlightColor: {
          photoId: "54e4b78b498ebdf2d8fcdf05",
          value: -12058608,
        },
        highlightTextColor: {
          photoId: "54e4b78b498ebdf2d8fcdf05",
          value: -1,
        },
        algoVersion: 3,
      },
    },
  },
};
