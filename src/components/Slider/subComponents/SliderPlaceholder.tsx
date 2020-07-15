import React from "react";

type SliderPlaceholderProps = {
  searchEntity: string;
};

export const SliderPlaceholder: React.FC<SliderPlaceholderProps> = ({
  searchEntity,
}) => {
  return (
    <div className="Slider Slider__empty">
      <p>
        There is no {searchEntity} yet.
        <br />
        Try to search something magical
        <span role="img" aria-label="stars">
          ✨
        </span>
      </p>
    </div>
  );
};
