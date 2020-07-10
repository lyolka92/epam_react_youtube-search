import React from "react";
import PropTypes from "prop-types";

function SearchPlaceholder({searchEntity}) {
    return (
        <div className="Slider Slider__empty">
            <p>
                There is no {searchEntity} yet.
                <br />
                Try to search something magical
                <span role="img" aria-label="stars">✨</span>
            </p>
        </div>
    );
}

SearchPlaceholder.propTypes = {
    searchEntity: PropTypes.string.isRequired,
}

export default SearchPlaceholder;