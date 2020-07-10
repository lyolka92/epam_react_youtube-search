function rootReducer(state, action) {
    switch (action.type) {
        case "UPDATE_SEARCH_PARAMS":
            return {
                ...state,
                searchParams: {
                    keyword: action.searchKeyword,
                    nextPageToken: action.nextPageToken
                }
            }
        case "SET_VIDEOS":
            return {
                ...state,
                videos: action.videos
            }
        case "UPDATE_VIDEOS":
            return {
                ...state,
                videos: [...state.videos, ...action.videos]
            }
        case "UPDATE_SLIDER_PARAMS":
            return {
                ...state,
                sliderParams: {
                    currentPageNumber: action.currentPageNumber,
                    videosPerPage: action.videosPerPage,
                    lastAvailablePage: action.lastAvailablePage
                }
            }
        case "TOGGLE_LOADING":
            return {
                ...state,
                isLoading: !state.isLoading
            }
        default:
            return state;
    }
}

export {rootReducer};