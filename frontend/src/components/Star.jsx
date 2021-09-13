import React from "react";

const Star = (props) => {
  return (
    <div
      className={
        "star " +
        (props.index <= Math.round(props.rating) ? "full-star" : "empty-star")
      }
    ></div>
  );
};

export default Star;
