import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="slider slider__empty">
      <p>
        <span role="img" aria-label="stars">
          ✨
        </span>
        Magic is happening
        <span role="img" aria-label="stars">
          ✨
        </span>
      </p>
    </div>
  );
};
