import { updateVideos, setVideos } from "../actions/videoActions";
import { setSliderCurrentPage, toggleLoading, updateSliderParams } from "../actions/sliderActions";
import { getVideosByKeyword } from "../../api/search-service";
import { updateSearchParams } from "../actions/searchActions";

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
        const { videos } = getState();
        action.videosPerPage = getVideosPerPage();
        action.lastAvailablePage =
          videos.length > 0
            ? Math.ceil(videos.length / action.videosPerPage)
            : 1;
      } else if (action.type === "SET_SLIDER_CURRENT_PAGE") {
        const { slider, videos, search } = getState();
        if (
          videos.length > 0 &&
          slider.lastAvailablePage > 1 &&
          action.currentPageNumber >= slider.lastAvailablePage - 2
        ) {
          dispatch(searchVideos(search.keyword, search.nextPageToken));
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
        dispatch(updateSearchParams(searchKeyword, searchResult.nextPageToken));
        dispatch(setVideos(searchResult.items));
        dispatch(setSliderCurrentPage(1));

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
        dispatch(updateSliderParams());
      }
    } catch (error) {
      console.log(error);
    }
    return "done";
  };
}

export { sliderMiddleware, searchVideos };
