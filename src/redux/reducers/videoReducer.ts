import { VideoActionTypes } from "../../types/ActionTypes";
import { Video } from "../../types/VideoStore";

const initialState: Video[] = [];

export const videoReducer = (
  state = initialState,
  action: VideoActionTypes
): Video[] => {
  switch (action.type) {
    case "SET_VIDEOS":
      return [...action.videos];
    case "UPDATE_VIDEOS":
      return [...state, ...action.videos];
    default:
      return state;
  }
};
