const baseUrl = "/api/reviews";

class reviewService {
  getAll(limit = null) {
    return fetch(baseUrl + "?limit=" + limit);
  }

  create(newReview) {
    return fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new reviewService();
