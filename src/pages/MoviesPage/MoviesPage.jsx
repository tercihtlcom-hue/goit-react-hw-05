import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    searchMovies(query)
      .then(setMovies)
      .catch(console.error);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.query.value.trim();
    
    if (value === "") return;
    setSearchParams({ query: value });
    form.reset();
  };

  return (
    <main className={css.container}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input 
          className={css.input}
          type="text" 
          name="query" 
          autoComplete="off" 
          autoFocus 
          placeholder="Search movies..."
        />
        <button className={css.button} type="submit">Search</button>
      </form>
      
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default MoviesPage;