import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MovieDetailsProps, Review } from "../../types/movieAppTypes";
import { MoviesContext } from "../../contexts/moviesContext";

const ReviewForm = (movie: MovieDetailsProps) => {
  const { register, handleSubmit } = useForm<Review>();
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState<number>(3);

  const onSubmit: SubmitHandler<Review> = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    context.addReview(movie, review);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Write a Review</h3>

      <textarea
        {...register("content", { required: true })}
        rows={5}
        cols={40}
        placeholder="Write your review here"
      />

      <br />

      <label>Rating: </label>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>

      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
