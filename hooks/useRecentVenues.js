import useLocalStorage from "./useLocalStorage";

export default function useRecentVenues() {
  const [recent, setRecent] = useLocalStorage("recent", []);

  const addToRecent = (newVenue) => {
    let newRecent = recent.filter(
      (venue) => venue.venue.id !== newVenue.venue.id
    );

    if (newRecent.length === 20) {
      newRecent.pop();
    }

    newRecent.unshift(newVenue);

    setRecent(newRecent);
  };

  const clearRecent = () => {
    setRecent([]);
  };

  return { recent, addToRecent, clearRecent };
}
