import React from 'react';
import PropTypes from 'prop-types';
import { getVideosByKeyword } from '../api/search-service';
import './Search.css';

function Search({
  setSearchKeyword, setNextPageToken, setLoading, setVideos, searchKeyword, nextPageToken,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const searchResult = await getVideosByKeyword(searchKeyword, nextPageToken);
    setNextPageToken(searchResult.nextPageToken);
    setVideos(searchResult.items);

    setLoading(false);
  };

  const handleChange = (event) => setSearchKeyword(event.target.value);

  return (
    <form
      className="Search"
      onSubmit={handleSubmit}
    >
      <input
        className="Search__input"
        type="text"
        placeholder="Search on YouTube 🦄"
        value={searchKeyword}
        onChange={handleChange}
      />
      <button className="Search__btn" type="submit" aria-label="search">
        <svg
          className="Search__icon"
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </form>
  );
}

Search.propTypes = {
  setSearchKeyword: PropTypes.func.isRequired,
  setNextPageToken: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setVideos: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string,
  nextPageToken: PropTypes.string,
};

Search.defaultProps = {
  searchKeyword: '',
  nextPageToken: null,
};

export default Search;
