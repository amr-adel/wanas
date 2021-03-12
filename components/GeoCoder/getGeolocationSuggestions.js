import axios from "axios";

export default function getGeolocationSuggestions(query, locale) {
  const suggestions = axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&language=${locale}&types=region,district,place,postcode`
    )
    .then((response) => {
      if (response.data.features < 1) {
        return [];
      } else {
        // Get suggetion text for different locales from wikidata
        const wikidataCodes = response.data.features
          .filter((place) => place.properties.wikidata)
          .map((place) => place.properties.wikidata)
          .join("|");

        return getlabelsByWikidataCode(wikidataCodes).then((labels) => {
          return response.data.features.map((place) => {
            const countryCode =
              place.context?.filter((con) => con.id.includes("country"))[0]
                .short_code || null;

            // Return needed data only
            return {
              id: place.id,
              center: {
                lat: place.center[1],
                lng: place.center[0],
              },
              text: place.text,
              countryCode,
              place_name: place.place_name,
              labels: labels[place.properties.wikidata] || null,
            };
          });
        });
      }
    })
    .catch((error) => error.response.data);

  return suggestions;
}

const getlabelsByWikidataCode = (code) => {
  return axios
    .get(
      `https://www.wikidata.org/w/api.php?format=json&languages=en%7Car%7Ces&ids=${code}&props=labels&action=wbgetentities&origin=*`
    )
    .then((response) => {
      const labels = {};
      const locales = ["en", "es", "ar"];

      for (let code in response.data.entities) {
        labels[code] = {};
        for (let locale of locales) {
          if (response.data.entities[code].labels[locale]) {
            labels[code][locale] =
              response.data.entities[code].labels[locale].value;
          }
        }
      }

      return labels;
    })
    .catch((error) => error.response);
};
