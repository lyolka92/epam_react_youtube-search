import { SliderActionTypes } from "../../types/ActionTypes";
import { SliderStore } from "../../types/SliderStore";

const initialState: SliderStore = {
  videosPerPage: 0,
  currentPageNumber: 1,
  lastAvailablePage: 1,
  isLoading: false,
};

export const sliderReducer = (
  state = initialState,
  action: SliderActionTypes
): SliderStore => {
  switch (action.type) {
    case "UPDATE_SLIDER_PARAMS":
      return {
        ...state,
        videosPerPage: action.videosPerPage,
        lastAvailablePage: action.lastAvailablePage,
      };
    case "SET_SLIDER_CURRENT_PAGE":
      return {
        ...state,
        currentPageNumber: action.currentPageNumber,
      };
    case "TOGGLE_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};
