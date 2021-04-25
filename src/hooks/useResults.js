import { useEffect, useState } from 'react';
import tmdb from '../api/tmdb';

export default () => {
  const [directorID, setDirectorID] = useState([]);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    try {
      const director = await tmdb.get('/search/person', {
        params: {
          api_key: "d123ec1dfc61dd7ae05d4b0d2fc4d345",
          query: searchTerm,
        }
      });
      setDirectorID(director.data.results[0].id);

      const directorCredits = await tmdb.get(`person/${directorID}/movie_credits`, {
        params: {
          api_key: "d123ec1dfc61dd7ae05d4b0d2fc4d345",
          language: 'es-ES'
        }
      })
      const directedMovies = directorCredits.data.crew.filter(content => content.job === "Director")   
      setResults(directedMovies);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  // Call searchApi when component
  // is first rendered.  BAD CODE!
  // searchApi('pasta');
  useEffect(() => {
    searchApi('David+Fincher');
  }, []);

  return [searchApi, results, errorMessage];
};