import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateSearchParams} from "../redux/actions/actions";
import {searchVideos} from "../redux/middleware/middleware";
import './Search.css';

export default function Search() {
  const searchKeyword = useSelector(state => state.searchParams.keyword);
  const nextPageToken = useSelector(state => state.searchParams.nextPageToken);
  const dispatch = useDispatch();

  async function handleSubmit (event) {
    event.preventDefault();
    dispatch(searchVideos(searchKeyword, ''));
  }

  const handleChange = event => dispatch(updateSearchParams(event.target.value, nextPageToken));

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
      )
}
