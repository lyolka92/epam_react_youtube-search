import { ErrorStore } from "../../types/ErrorStore";
import { ErrorActionTypes } from "../../types/ActionTypes";

const initialState: ErrorStore = {
  error: "",
};

export const errorReducer = (
  state = initialState,
  action: ErrorActionTypes
): ErrorStore => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        error: action.error,
      };
    case "HIDE_ERROR":
      return {
        error: "",
      };
    default:
      return state;
  }
};
