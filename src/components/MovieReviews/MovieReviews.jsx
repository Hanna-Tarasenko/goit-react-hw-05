import s from "./MovieReviews.module.css";
const MovieReviews = ({ reviews }) => {
  return (
    <div>
      {reviews.length === 0 ? (
        <p>We don’t have any reviews for this movie yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>{review.author}</h4>
              <p className={s.reviewParagraph}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
