import React from "react";
import reviewService from "./services/reviewService";
import Review from "./components/Review";
import ReviewForm from "./components/ReviewForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      averageRating: 0,
      isReviewFormVisible: false,
    };

    this.toggleReviewForm = this.toggleReviewForm.bind(this);
    this.submitCallback = this.submitCallback.bind(this);
  }

  componentDidMount() {
    const socket = new WebSocket("ws://" + window.location.hostname + ":3001");

    socket.onmessage = ({ data }) => {
      console.log(JSON.parse(data));
      this.appendReview(JSON.parse(data));
    };
    this.refreshReviews();
  }

  async refreshReviews() {
    let reviews = await reviewService.getAll().then((resp) => resp.json());

    this.setState({
      averageRating: this.calculateAverageRating(reviews),
      reviews: reviews,
    });
  }

  appendReview(review) {
    let reviews = [...this.state.reviews];
    reviews.unshift(review);
    this.setState({
      averageRating: this.calculateAverageRating(reviews),
      reviews: reviews,
    });
  }

  calculateAverageRating(reviews) {
    let average = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
    let roundedAverage = (Math.round(average * 10) / 10).toFixed(1);
    return isNaN(roundedAverage) ? "N/A" : roundedAverage;
  }

  toggleReviewForm() {
    this.setState({ isReviewFormVisible: !this.state.isReviewFormVisible });
  }

  submitCallback() {
    this.toggleReviewForm();
  }

  render() {
    return (
      <header className="App-header">
        <h1>The Minimalist Entrepreneur</h1>

        <div className="rating-box mt-1">
          <h1 id="rating-average" className="rating-average">
            {this.state.averageRating}
          </h1>
          <div
            id="rating-average-stars"
            className="rating-stars-container"
          ></div>
          <button
            id="btn-add-review"
            onClick={this.toggleReviewForm.bind(this)}
          >
            Add review
          </button>
        </div>

        <div className="separator"></div>

        <h2>Reviews</h2>
        <div id="reviews-box">
          {this.state.reviews.map((r) => (
            <Review content={r.content} rating={r.rating} key={r._id} />
          ))}
        </div>
        {
          <ReviewForm
            isToggled={this.state.isReviewFormVisible}
            submitCallback={this.submitCallback}
            overlayClicked={this.toggleReviewForm}
          />
        }
      </header>
    );
  }
}

export default App;
