import { searchVideos } from "../actions/videoActions";
import { AppState } from "../store/store";
import { Dispatch } from "redux";
import { AppActions } from "../../types/ActionTypes";
import { ThunkDispatch } from "redux-thunk";

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

export const sliderMiddleware = ({
  getState,
  dispatch,
}: {
  getState: () => AppState;
  dispatch: ThunkDispatch<AppState, unknown, AppActions>;
}) => {
  return function (next: Dispatch<AppActions>) {
    return function (action: AppActions) {
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
};
