import React from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

function SliderPagination({ totalVideosCount, videosPerPage, setCurrentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideosCount / videosPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="Slider-pagination__list">
      {pageNumbers.map((pageNumber) => (
        <li
          className="Slider-pagination__item"
          key={pageNumber}
        >
          <button
            type="button"
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
    </ul>
  );
}

SliderPagination.propTypes = {
  totalVideosCount: PropTypes.number.isRequired,
  videosPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default SliderPagination;
