import { AppActions } from "../../types/actions";
import { Video } from "../../types/Video";
import {
  setSliderCurrentPage,
  toggleLoading,
  updateSliderParams,
} from "./sliderActions";
import { getVideosByKeyword } from "../../api/search-service";
import { updateSearchParams } from "./searchActions";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../store/store";

export const setVideos = (videos: Video[]): AppActions => {
  return {
    type: "SET_VIDEOS",
    videos,
  };
};

export const updateVideos = (videos: Video[]): AppActions => {
  return {
    type: "UPDATE_VIDEOS",
    videos,
  };
};

export const searchVideos = (
  searchKeyword: string,
  nextPageToken: string
): ThunkAction<Promise<string>, AppState, unknown, AppActions> => {
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
};
