import { Video } from "./Video";

export const UPDATE_SEARCH_PARAMS = "UPDATE_SEARCH_PARAMS";

export interface UpdateSearchParamsAction {
  type: typeof UPDATE_SEARCH_PARAMS;
  searchKeyword: string;
  nextPageToken?: string;
}

export type SearchActionTypes = UpdateSearchParamsAction;

export const SET_VIDEOS = "SET_VIDEOS";
export const UPDATE_VIDEOS = "UPDATE_VIDEOS";

export interface SetVideosAction {
  type: typeof SET_VIDEOS;
  videos: Video[];
}

export interface UpdateVideosAction {
  type: typeof UPDATE_VIDEOS;
  videos: Video[];
}

export type VideoActionTypes = SetVideosAction | UpdateVideosAction;

export const UPDATE_SLIDER_PARAMS = "UPDATE_SLIDER_PARAMS";
export const SET_SLIDER_CURRENT_PAGE = "SET_SLIDER_CURRENT_PAGE";
export const TOGGLE_LOADING = "TOGGLE_LOADING";

export interface UpdateSliderParamsAction {
  type: typeof UPDATE_SLIDER_PARAMS;
  videosPerPage: number;
  lastAvailablePage: number;
}

export interface SetSliderCurrentPageAction {
  type: typeof SET_SLIDER_CURRENT_PAGE;
  currentPageNumber: number;
}

export interface ToggleLoadingAction {
  type: typeof TOGGLE_LOADING;
}

export type SliderActionTypes =
  | UpdateSliderParamsAction
  | SetSliderCurrentPageAction
  | ToggleLoadingAction;

export type AppActions =
  | SearchActionTypes
  | VideoActionTypes
  | SliderActionTypes;
