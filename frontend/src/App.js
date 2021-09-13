import Review from "./components/Review";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Minimalist Entrepreneur</h1>

        <div className="rating-box mt-1">
          <h1 id="rating-average" className="rating-average">
            0.0
          </h1>
          <div
            id="rating-average-stars"
            className="rating-stars-container"
          ></div>
          <button id="btn-add-review" onClick="openReviewForm()">
            Add review
          </button>
        </div>

        <div className="separator"></div>

        <h2>Reviews</h2>
        <div id="reviews-box">
          <Review rating={1} content="wow."></Review>
        </div>

        <div id="modal" style={{ display: "none" }}>
          <a className="overlay" onClick="closeReviewForm()"></a>
          <div className="form-container">
            <h1>What's your rating?</h1>
            <p>Rating</p>
            <div
              id="new-rating-stars-container"
              className="rating-stars-container"
            >
              <a className="star empty-star grow" onClick="setRating(1)"></a>
              <a className="star empty-star grow" onClick="setRating(2)"></a>
              <a className="star empty-star grow" onClick="setRating(3)"></a>
              <a className="star empty-star grow" onClick="setRating(4)"></a>
              <a className="star empty-star grow" onClick="setRating(5)"></a>
            </div>
            <p htmlFor="review-text">Review</p>
            <textarea
              type="text"
              id="review-content"
              placeholder="Start typing..."
              name="content"
              required
              maxLength="1000"
            ></textarea>
            <button onClick="submitReview()">Submit Review</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
