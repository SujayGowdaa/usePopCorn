import { useState, useEffect } from 'react';

export const useMovies = (query, KEY, callback) => {
  // const KEY = 'ce988258';
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error('Something went wrong 🤔');
        }
        const data = await res.json();
        if (data.Response === 'False') {
          throw new Error('Movie not found 😭');
        }
        setError('');
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError('Enter atleast 3 characters to search a movie 🔍');
      return;
    }
    callback?.();
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
};
