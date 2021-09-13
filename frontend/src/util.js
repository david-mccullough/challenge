export function getStarsFromRating(rating) {
  let stars = [];
  for (let i = 1; i <= 5; i++)
    stars.push(
      `<div class="star ${
        i <= Math.round(rating) ? "full-star" : "empty-star"
      }"></div>`
    );

  return stars;
}
