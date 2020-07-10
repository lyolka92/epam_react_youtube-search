function updateSearchParams(searchKeyword, nextPageToken) {
    return {
        type: "UPDATE_SEARCH_PARAMS",
        searchKeyword,
        nextPageToken
    }
}

function setVideos(videos) {
    return {
        type: "SET_VIDEOS",
        videos
    }
}

function updateVideos(videos) {
    return {
        type: "UPDATE_VIDEOS",
        videos
    }
}

function updateSliderParams(currentPageNumber, videosPerPage, lastAvailablePage) {
    return {
        type: "UPDATE_SLIDER_PARAMS",
        currentPageNumber,
        videosPerPage,
        lastAvailablePage
    }
}

function toggleLoading() {
    return {
        type: "TOGGLE_LOADING"
    }
}

export {
    updateSearchParams,
    setVideos,
    updateVideos,
    updateSliderParams,
    toggleLoading
}