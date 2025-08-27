import { useEffect, useState } from 'react';

export const useDebounce = (value: string | number, delay: number) => {
  const [debounceSearchName, setDebounceSearchName] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchName(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceSearchName;
};
