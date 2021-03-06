import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSliderCurrentPage } from "../../../redux/actions/sliderActions";
import { AppState } from "../../../redux/store/store";
import "../Slider.css";

export const SliderPagination: React.FC = () => {
  const currentPageNumber = useSelector(
    (state: AppState) => state.slider.currentPageNumber
  );
  const lastAvailablePage = useSelector(
    (state: AppState) => state.slider.lastAvailablePage
  );
  const dispatch = useDispatch();

  const availablePageNumbers = [...Array(lastAvailablePage).keys()].map(
    (i) => i + 1
  );
  const firstPageIndexToRender =
    currentPageNumber === 1 ? 0 : currentPageNumber - 2;
  const pageNumbersToRender = availablePageNumbers.slice(
    firstPageIndexToRender,
    currentPageNumber + 1
  );

  const handleClick = (pageNumber: number) =>
    dispatch(setSliderCurrentPage(pageNumber));

  return (
    <ul className="slider-pagination__list">
      {pageNumbersToRender.map((pageNumber) => (
        <li className="slider-pagination__item" key={pageNumber}>
          <button
            className={
              pageNumber === currentPageNumber
                ? "slider-pagination__item-button slider-pagination__item-button__active"
                : "slider-pagination__item-button"
            }
            type="button"
            onClick={() => handleClick(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
    </ul>
  );
};
