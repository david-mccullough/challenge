import React from "react";
import Star from "./Star";

const Review = (props) => {
  return (
    <div className="review">
      <div className="rating-stars-container">
        {getStarsFromRating(props.rating)}
      </div>
      <p>
        <span className="rating">{props.rating}</span>, {props.content}
      </p>
    </div>
  );
};

function getStarsFromRating(rating) {
  let stars = [];
  for (let i = 1; i <= 5; i++)
    stars.push(<Star rating={rating} index={i} key={i} />);
  return stars;
}

export default Review;
