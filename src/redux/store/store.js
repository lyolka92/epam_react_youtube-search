import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import {rootReducer} from "../reducers/rootReducer";
import {sliderMiddleware} from "../middleware/middleware";

const initialState = {
    searchParams: {
        keyword: '',
        nextPageToken: ''
    },
    sliderParams: {
        videosPerPage: 0,
        currentPageNumber: 1,
        lastAvailablePage: 1
    },
    isLoading: false,
    videos: []
};


const store = createStore(rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(sliderMiddleware, thunk)
    )
);

export default store;
