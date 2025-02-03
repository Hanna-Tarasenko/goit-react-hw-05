import { useEffect, useState } from "react";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    searchMovies(query)
      .then((results) => {
        setMovies(results);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (!searchQuery) {
      setMovies([]);
      setSearchParams({});
      return;
    }

    setSearchParams({ query: searchQuery });
    form.reset();
  };

  return (
    <div className={s.moviesSearchContainer}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          name="query"
          placeholder="Search movies..."
        />
        <button className={s.searchBtn} type="submit">
          Search
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length === 0 && query && !error && (
        <p className={s.noMoviesFound}>No movies found</p>
      )}
    </div>
  );
};
export default MoviesPage;
