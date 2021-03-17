export default function changeMapLocale(map, locale) {
  const textField = map.getLayoutProperty("country-label", "text-field");

  if (textField[1]?.[1].indexOf(locale) === -1) {
    // https://stackoverflow.com/questions/58605220/how-to-change-language-in-mapbox
    map.getStyle().layers.forEach((lyr) => {
      if (lyr.id.indexOf("-label") > 0) {
        map.setLayoutProperty(lyr.id, "text-field", [
          "coalesce",

          ["get", `name_${locale}`],
          ["get", `name_en`],
          ["get", `name`],
        ]);
      }
    });
  }
}
