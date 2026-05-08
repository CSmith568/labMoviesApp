import { MovieReviewProps } from "../types/movieAppTypes";

const MovieReview = (review: MovieReviewProps) => {
  return (
    <>
      <p>Review By: {review.author}</p>
      <p>{review.content}</p>
    </>
  );
};

export default MovieReview;