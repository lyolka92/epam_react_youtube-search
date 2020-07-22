import React from "react";

type AppErrorProps = {
  error: string;
};

export const AppError: React.FC<AppErrorProps> = (props) => {
  return (
    <div className="slider slider__empty">
      <p>
        <strong>Error:</strong>{" "}
        <span className="slider__error">{props.error}</span> <br /> Try to come
        back later{" "}
        <span role="img" aria-label="sad face">
          🥺
        </span>
      </p>
    </div>
  );
};
