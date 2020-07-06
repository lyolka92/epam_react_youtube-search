import React from "react";
import "./Slider.css";

function SliderPagination(props) {
    return (
        <ul className="Slider-pagination__list">
            {props.pageNumbers.map(pageNumber => <li className="Slider-pagination__item" key={pageNumber}>{pageNumber}</li>)}
        </ul>
    )
}

export default SliderPagination;
