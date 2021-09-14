import React from "react";

const Star = (props) => {
  return (
    <div
      className={`star ${props.onClick ? "interactive grow" : ""} ${
        props.index <= Math.round(props.rating) ? "full-star" : "empty-star"
      }`}
      {...props}
    ></div>
  );
};

export default Star;
