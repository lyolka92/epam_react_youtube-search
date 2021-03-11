import { AppActions } from "../../types/ActionTypes";

export const setError = (error: string = ""): AppActions => {
  return {
    type: "SET_ERROR",
    error,
  };
};

export const hideError = (): AppActions => {
  return {
    type: "HIDE_ERROR",
  };
};
