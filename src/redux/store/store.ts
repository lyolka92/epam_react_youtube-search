import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { sliderMiddleware } from "../middleware/middleware";
import { searchReducer } from "../reducers/searchReducer";
import { videoReducer } from "../reducers/videoReducer";
import { sliderReducer } from "../reducers/sliderReducer";
import { errorReducer } from "../reducers/errorReducer";

const rootReducer = combineReducers({
  search: searchReducer,
  slider: sliderReducer,
  videos: videoReducer,
  error: errorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sliderMiddleware, thunk))
);
