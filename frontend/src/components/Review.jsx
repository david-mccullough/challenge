import React from "react";
import Star from "./Star";

const Review = ({ rating, content }) => {
  return (
    <div className="review">
      <div className="rating-stars-container">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star rating={rating} index={i} key={i} />
        ))}
      </div>
      <p>
        <span className="rating">{rating}</span>, {content}
      </p>
    </div>
  );
};

export default Review;
