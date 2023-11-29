import { useState, useEffect } from 'react';

export function useLocal(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedItem = localStorage.getItem(key);
    return JSON.parse(storedItem) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
