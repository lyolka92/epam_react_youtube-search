import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateSliderParams} from "../../../redux/actions/actions";
import '../Slider.css';

function SliderPagination() {
  const currentPageNumber = useSelector(state => state.sliderParams?.currentPageNumber);
  const lastAvailablePage = useSelector(state => state.sliderParams?.lastAvailablePage);
  const dispatch = useDispatch();

  const availablePageNumbers = [...Array(lastAvailablePage).keys()].map(i => i + 1);
  const firstPageIndexToRender = currentPageNumber === 1 ? 0 : currentPageNumber - 2;
  const pageNumbersToRender = availablePageNumbers.slice(firstPageIndexToRender, currentPageNumber + 1);

  const handleClick = pageNumber => dispatch(updateSliderParams(pageNumber));

  return (
    <ul className="Slider-pagination__list">
      {pageNumbersToRender.map((pageNumber) => (
        <li
          className="Slider-pagination__item"
          key={pageNumber}
        >
          <button
            className={
              pageNumber === currentPageNumber
                  ? 'Slider-pagination__item-button Slider-pagination__item-button__active'
                  : 'Slider-pagination__item-button'
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
}

export default SliderPagination;
