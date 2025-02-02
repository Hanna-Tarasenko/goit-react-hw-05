import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieReviews,
} from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await fetchMovieDetails(movieId);
      const movieCredits = await fetchMovieCredits(movieId);
      const movieReviews = await fetchMovieReviews(movieId);

      setMovieDetails(details);
      setCredits(movieCredits);
      setReviews(movieReviews);
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <div className={s.movieDetailsContainer}>
      <Link className={s.goBack} to="/">
        Go back
      </Link>
      <h2 className={s.movieName}>{movieDetails.title}</h2>
      <img
        className={s.img}
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <p>
        <span className={s.movieDetailsSpan}> User Score:</span>{" "}
        {(movieDetails.vote_average * 10).toFixed(1)}%
      </p>
      <p>
        {" "}
        <span className={s.movieDetailsSpan}>Overview:</span>{" "}
        {movieDetails.overview}
      </p>
      <p>
        <span className={s.movieDetailsSpan}> Genres: </span>
        {movieDetails.genres?.map((genre) => genre.name).join(", ")}
      </p>
      <div className={s.btnContainer}>
        <button className={s.btn} onClick={() => setShowCast(!showCast)}>
          {showCast ? "Cast" : "Cast"}
        </button>
        {showCast && <MovieCast cast={credits} />}
        <button className={s.btn} onClick={() => setShowReviews(!showReviews)}>
          {showReviews ? "Reviews" : "Reviews"}
        </button>
        {showReviews && <MovieReviews reviews={reviews} />}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
