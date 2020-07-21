import React, { useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { SliderPlaceholder } from "./subComponents/SliderPlaceholder";
import { SliderVideo } from "./subComponents/SliderVideo";
import { SliderPagination } from "./subComponents/SliderPagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setSliderCurrentPage,
  updateSliderParams,
} from "../../redux/actions/sliderActions";
import { useSwipeable } from "react-swipeable";
import "./Slider.css";
import { AppState } from "../../redux/store/store";

export const Slider: React.FC = () => {
  const videos = useSelector((state: AppState) => state.videos);

  const loading = useSelector((state: AppState) => state.slider.isLoading);
  const videosPerPage = useSelector(
    (state: AppState) => state.slider.videosPerPage
  );
  const currentPageNumber = useSelector(
    (state: AppState) => state.slider.currentPageNumber
  );

  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      dispatch(updateSliderParams());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (currentPageNumber > 1) {
        const nextPageNumber = currentPageNumber - 1;
        dispatch(setSliderCurrentPage(nextPageNumber));
      }
    },
    onSwipedLeft: () => {
      const nextPageNumber = currentPageNumber + 1;
      dispatch(setSliderCurrentPage(nextPageNumber));
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) {
    return <Loader />;
  }

  if (!videos || videos.length === 0) {
    return <SliderPlaceholder searchEntity="videos" />;
  }

  if (videosPerPage === 0) {
    dispatch(updateSliderParams());
  }

  const indexOfLastVideo = currentPageNumber * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = Object.values(videos).slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  return (
    <div className="slider" {...swipeHandlers}>
      <div className="slider-videos">
        {currentVideos.map((video) => (
          <SliderVideo videoInfo={video} key={video.id} />
        ))}
      </div>
      <nav className="slider-pagination">
        <SliderPagination />
      </nav>
    </div>
  );
};
