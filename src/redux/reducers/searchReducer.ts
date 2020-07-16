import { SearchActionTypes } from "../../types/actions";
import { SearchStore } from "../../types/SearchStore";

const initialState: SearchStore = {
  keyword: "",
  nextPageToken: "",
};

export const searchReducer = (
  state = initialState,
  action: SearchActionTypes
): SearchStore => {
  switch (action.type) {
    case "UPDATE_SEARCH_PARAMS":
      return {
        ...state,
        keyword: action.searchKeyword,
        nextPageToken: action.nextPageToken,
      };
    default:
      return state;
  }
};
