import { useEffect, useState } from 'react';
import tmdb from '../api/tmdb';

export default () => {
  // const [directorID, setDirectorID] = useState([]);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    tmdb
    .get('/search/person', {
      params: {
        api_key: "d123ec1dfc61dd7ae05d4b0d2fc4d345",
        query: searchTerm,
      }
    })
    .then(response => {
      return tmdb.get(`/person/${response.data.results[0].id}/movie_credits`, {
        params: {
          api_key: "d123ec1dfc61dd7ae05d4b0d2fc4d345",
          language: 'es-ES'
        }
      }
     );
    })
    .then(response => {
      const directedMovies = response.data.crew.filter(content => content.job === "Director")   
      setResults(directedMovies);
    })
    .catch(error => console.log(error.response));
  };

  // Call searchApi when component
  // is first rendered.  BAD CODE!
  // searchApi('pasta');
  useEffect(() => {
    searchApi('David Fincher');
  }, []);

  return [searchApi, results, errorMessage];
};