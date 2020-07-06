import React from "react";
import "./Slider.css";

function SliderPagination(props) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalVideosCount / props.videosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="Slider-pagination__list">
            {pageNumbers.map(pageNumber => (
                <li className="Slider-pagination__item"
                    key={pageNumber}
                    onClick={() => props.setCurrentPage(pageNumber)}>
                    {pageNumber}
                </li>
            ))}
        </ul>
    )
}

export default SliderPagination;
