import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../services/api";
import s from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      setMovies(trendingMovies);
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={s.homeContainer}>
      <h1 className={s.header}>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
