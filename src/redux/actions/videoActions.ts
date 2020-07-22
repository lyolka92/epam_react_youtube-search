import { AppActions } from "../../types/ActionTypes";
import { Video } from "../../types/VideoStore";
import {
  setSliderCurrentPage,
  toggleLoading,
  updateSliderParams,
} from "./sliderActions";
import { getVideosByKeyword } from "../../api/search-service";
import { updateSearchParams } from "./searchActions";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../store/store";
import { hideError, setError } from "./errorActions";

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
    const search = async (): Promise<any> => {
      dispatch(hideError());

      const searchResult = await getVideosByKeyword(
        searchKeyword,
        nextPageToken
      );

      if (searchResult.error) {
        dispatch(setError(searchResult.error));
      } else {
        if (nextPageToken === "") {
          dispatch(setVideos(searchResult.data!.items));
          dispatch(setSliderCurrentPage(1));
        } else {
          dispatch(updateVideos(searchResult.data!.items));
        }

        dispatch(
          updateSearchParams(
            searchResult.data!.keyword,
            searchResult.data!.nextPageToken
          )
        );
        dispatch(updateSliderParams());
      }
    };

    const callAsyncWithLoader = async (func: () => any): Promise<any> => {
      dispatch(toggleLoading());
      await func();
      dispatch(toggleLoading());
    };

    try {
      if (nextPageToken === "") {
        await callAsyncWithLoader(search);
      } else {
        await search();
      }
    } catch (error) {
      console.log(error);
    }
    return "done";
  };
};
