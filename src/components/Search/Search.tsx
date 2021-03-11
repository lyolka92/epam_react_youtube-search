import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchParams } from "../../redux/actions/searchActions";
import { searchVideos } from "../../redux/actions/videoActions";
import "./Search.css";
import { AppState } from "../../redux/store/store";

export const Search: React.FC = () => {
  const searchKeyword = useSelector((state: AppState) => state.search.keyword);
  const nextPageToken = useSelector(
    (state: AppState) => state.search.nextPageToken
  );
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(searchVideos(searchKeyword, ""));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchParams(event.target.value, nextPageToken));
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="Search on YouTube 🦄"
        value={searchKeyword}
        onChange={handleChange}
      />

      <button className="search__btn" type="submit" aria-label="search">
        <svg
          className="search__icon"
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </button>
    </form>
  );
};
