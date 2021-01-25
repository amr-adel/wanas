import { useState, useEffect } from "react";

export default function useThrottle(query, delay = 800) {
  const [throttledQuery, setThrottledQuery] = useState(query);

  useEffect(() => {
    const throttler = setTimeout(() => {
      setThrottledQuery(query);
    }, delay);
    return () => {
      clearTimeout(throttler);
    };
  }, [query]);

  return { throttledQuery };
}
