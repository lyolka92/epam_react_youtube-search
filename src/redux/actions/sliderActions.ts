import { AppActions } from "../../types/actions";

export const updateSliderParams = (
  videosPerPage: number = 0,
  lastAvailablePage: number = 0
): AppActions => {
  return {
    type: "UPDATE_SLIDER_PARAMS",
    videosPerPage,
    lastAvailablePage,
  };
};

export const setSliderCurrentPage = (currentPageNumber: number): AppActions => {
  return {
    type: "SET_SLIDER_CURRENT_PAGE",
    currentPageNumber,
  };
};

export const toggleLoading = (): AppActions => {
  return {
    type: "TOGGLE_LOADING",
  };
};
