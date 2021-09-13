import React from "react";
import reviewService from "../services/reviewService";
import Star from "./Star";

const ReviewForm = ({ isToggled, submitCallback, overlayClicked }) => {
  const [rating, setRating] = React.useState(0);
  const [content, setContent] = React.useState("");

  async function submitReview(review) {
    reviewService.create(review).then((resp) => {
      if (!resp.ok) {
        resp.json().then((errorJson) => alert(errorJson.message));
      } else {
        setRating(0);
        setContent("");
        submitCallback();
      }
    });
  }

  return (
    <div
      id="modal"
      style={
        isToggled
          ? { pointerEvents: "auto", opacity: 1 }
          : { pointerEvents: "none", opacity: 0 }
      }
    >
      <a className="overlay" onClick={overlayClicked}></a>
      <div className="form-container">
        <h1>What's your rating?</h1>
        <p>Rating</p>
        <div id="new-rating-stars-container" className="rating-stars-container">
          {/* <a className="star empty-star grow" onClick={setRating(1)}></a>
          <a className="star empty-star grow" onClick={setRating(2)}></a>
          <a className="star empty-star grow" onClick={setRating(3)}></a>
          <a className="star empty-star grow" onClick={setRating(4)}></a>
          <a className="star empty-star grow" onClick={setRating(5)}></a> */}
        </div>
        <p htmlFor="review-text">Review</p>
        <textarea
          type="text"
          id="review-content"
          placeholder="Start typing..."
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength="1000"
        ></textarea>
        <button
          onClick={() => submitReview({ rating: rating, content: content })}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
