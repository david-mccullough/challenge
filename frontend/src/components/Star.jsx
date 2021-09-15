import React from "react";

const Star = (props) => {
  let fill = "empty-star";
  let diff = props.index - (Math.round(props.rating * 2) / 2).toFixed(1);
  if (diff <= 0) fill = "full-star";
  else if (diff === 0.5) fill = "half-star";

  return (
    <div
      className={`star ${props.onClick ? "interactive grow" : ""} ${fill}`}
      {...props}
    ></div>
  );
};

export default Star;
