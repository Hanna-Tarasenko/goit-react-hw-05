import { useState } from "react";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
    setSearched(true);
    setQuery("");
  };

  return (
    <div className={s.moviesSearchContainer}>
      <form className={s.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
          className={s.input}
        />
        <button className={s.searchBtn} type="submit">
          Search
        </button>
      </form>

      {searched && movies.length === 0 && <p>No movies found.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
