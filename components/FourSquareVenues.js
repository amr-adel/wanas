export default function FourSquareVenues({ venues }) {
  return (
    <ol className="flex flex-col">
      {venues.map((venue) => {
        const { id, name, location, categories } = venue.venue;
        return (
          <li
            key={id}
            className="bg-white p-2 mb-4 rounded-lg shadow hover:shadow-md cursor-pointer"
          >
            {categories[0] ? (
              <span className="text-xs text-yellow-400 bg-yellow-50 py-1 px-2 rounded">
                {categories[0].name}
              </span>
            ) : null}

            <h6 className="text-xl text-red-500 border-b border-gray-200 mb-1 py-1">
              {name}
            </h6>
            <p className="text-sm text-gray-400">
              {location.formattedAddress[0]} <br />
              {location.formattedAddress[1]}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
