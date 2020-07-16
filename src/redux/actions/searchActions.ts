import { AppActions } from "../../types/actions";

export const updateSearchParams = (
  searchKeyword: string,
  nextPageToken: string = ""
): AppActions => {
  return {
    type: "UPDATE_SEARCH_PARAMS",
    searchKeyword,
    nextPageToken,
  };
};
