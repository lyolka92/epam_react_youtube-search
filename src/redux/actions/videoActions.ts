import { AppActions } from "../../types/actions";
import { Video } from "../../types/Video";

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
