import s from "./MovieCast.module.css";
import { FaUser } from "react-icons/fa";
const MovieCast = ({ cast }) => {
  return (
    <div>
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
            <p className={s.castParagraph}>
              {" "}
              <span className={s.character}> Character</span>: {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
