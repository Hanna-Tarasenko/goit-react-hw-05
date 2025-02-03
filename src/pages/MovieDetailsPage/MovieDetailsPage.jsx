import s from "./MovieDetailsPage.module.css";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const previousLocationRef = useRef(location.state?.from ?? "/movies");
  const handleGoBack = () => {
    navigate(previousLocationRef.current);
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await fetchMovieDetails(movieId);
      setMovieDetails(details);
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <div className={s.movieDetailsContainer}>
      <button className={s.goBack} onClick={handleGoBack}>
        Go Back
      </button>

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
        {showCast && <MovieCast movieId={movieId} />}
        <button className={s.btn} onClick={() => setShowReviews(!showReviews)}>
          {showReviews ? "Reviews" : "Reviews"}
        </button>
        {showReviews && <MovieReviews movieId={movieId} />}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
