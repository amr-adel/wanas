import { useState, useEffect } from "react";

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const savedValue = window.localStorage.getItem(key);

      if (savedValue) {
        return JSON.parse(savedValue);
      }
    }

    return initial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
