import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchMovieCredits } from "../../services/api";
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      const credits = await fetchMovieCredits(movieId);
      setCast(credits);
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li className={s.actorCard} key={actor.id}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width="100"
              />
            ) : (
              <FaUser size={50} />
            )}
            <p className={s.castParagraph}>{actor.name}</p>
            <p className={s.castParagraph}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
