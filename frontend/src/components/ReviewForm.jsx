import React from "react";
import reviewService from "../services/reviewService";
import Star from "./Star";

const ReviewForm = ({ isToggled, submitCallback, overlayClicked }) => {
  const [highlightRating, setHighlightRating] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    if (isToggled) window.addEventListener("keydown", focuseTextArea);
    else window.removeEventListener("keydown", focuseTextArea);
  }, [isToggled]);

  async function submitReview(review) {
    reviewService.create(review).then((resp) => {
      if (!resp.ok) {
        resp.json().then((errorJson) => alert(errorJson.message));
      } else {
        submitCallback();
        setHighlightRating(0);
        setRating(0);
        setContent("");
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
      <div className="overlay" onClick={overlayClicked}></div>
      <div className="form-container">
        <h1>What's your rating?</h1>

        <p>Rating</p>
        <div id="new-rating-stars-container" className="rating-stars-container">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              onClick={(e) => setRating(i + (isMouseOnLeftSide(e) ? -0.5 : 0))}
              onMouseMove={(e) =>
                setHighlightRating(i + (isMouseOnLeftSide(e) ? -0.5 : 0))
              }
              onMouseLeave={() => setHighlightRating(0)}
              rating={highlightRating || rating}
              index={i}
              key={i}
            ></Star>
          ))}
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

function focuseTextArea(e) {
  if (e.keyCode && e.keyCode !== 13)
    document.getElementById("review-content").focus();
}

function isMouseOnLeftSide(e) {
  let rect = e.currentTarget.getBoundingClientRect();
  let midpoint = (rect.x + rect.right) / 2;
  return e.pageX - midpoint < 0;
}
