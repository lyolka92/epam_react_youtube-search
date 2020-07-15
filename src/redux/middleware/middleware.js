import {
  toggleLoading,
  updateSearchParams,
  updateVideos,
  setVideos,
  updateSliderParams,
} from "../actions/actions";
import { getVideosByKeyword } from "../../api/search-service";

function getVideosPerPage() {
  const screenWidth = window.innerWidth;
  switch (true) {
    case screenWidth >= 1280:
      return 4;
    case screenWidth >= 910:
      return 3;
    case screenWidth >= 610:
      return 2;
    default:
      return 1;
  }
}

function sliderMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      if (action.type === "UPDATE_SLIDER_PARAMS") {
        const { sliderParams, videos, searchParams } = getState();
        const videosArray = Object.values(videos);
        const actionCurrentPageNumber = action.currentPageNumber;

        action.videosPerPage = getVideosPerPage();
        action.lastAvailablePage =
          Math.ceil(videosArray.length / action.videosPerPage) || 1;
        action.currentPageNumber =
          Math.min(
            actionCurrentPageNumber || sliderParams.currentPageNumber,
            action.lastAvailablePage
          ) || 1;

        if (
          videosArray.length > 0 &&
          action.currentPageNumber >= action.lastAvailablePage - 2
        ) {
          dispatch(
            searchVideos(searchParams.keyword, searchParams.nextPageToken)
          );
        }
      }

      return next(action);
    };
  };
}

function searchVideos(searchKeyword, nextPageToken) {
  return async (dispatch) => {
    try {
      if (nextPageToken === "") {
        dispatch(toggleLoading());

        const searchResult = await getVideosByKeyword(
          searchKeyword,
          nextPageToken
        );
        dispatch(
          updateSearchParams(searchResult.keyword, searchResult.nextPageToken)
        );
        dispatch(setVideos(searchResult.items));
        dispatch(updateSliderParams(1));

        dispatch(toggleLoading());
      } else {
        const searchResult = await getVideosByKeyword(
          searchKeyword,
          nextPageToken
        );
        dispatch(
          updateSearchParams(searchResult.keyword, searchResult.nextPageToken)
        );
        dispatch(updateVideos(searchResult.items));
      }
    } catch (error) {
      console.log(error);
    }
    return "done";
  };
}

export { sliderMiddleware, searchVideos };
