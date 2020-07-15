import React, { useEffect } from 'react';
import Loader from "../Loader/Loader";
import { SliderPlaceholder } from "./subComponents/SliderPlaceholder";
import SliderVideo from './subComponents/SliderVideo';
import SliderPagination from './subComponents/SliderPagination';
import { useDispatch, useSelector } from "react-redux";
import { updateSliderParams } from "../../redux/actions/actions";
import { useSwipeable } from "react-swipeable";
import './Slider.css';

function debounce(func, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(this);
    }, ms);
  };
}

export function Slider() {
  const loading = useSelector(state => state.isLoading);
  const videos = useSelector(state => state.videos);
  const videosPerPage = useSelector(state => state.sliderParams?.videosPerPage);
  const currentPageNumber = useSelector(state => state.sliderParams?.currentPageNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      dispatch(updateSliderParams());
    }

    const debouncedHandleResize = debounce(handleResize, 1000);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  });

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (currentPageNumber > 1) {
        const nextPageNumber = currentPageNumber - 1;
        dispatch(updateSliderParams(nextPageNumber));
      }
    },
    onSwipedLeft: () => {
      const nextPageNumber = currentPageNumber + 1;
      dispatch(updateSliderParams(nextPageNumber));
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) {
    return <Loader />;
  }

  if (Object.values(videos).length === 0) {
    return <SliderPlaceholder searchEntity="videos" />
  }

  if (videosPerPage === 0) {
    dispatch(updateSliderParams());
  }

  const indexOfLastVideo = currentPageNumber * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = Object.values(videos).slice(indexOfFirstVideo, indexOfLastVideo);

  return (
    <div className="Slider" {...swipeHandlers}>
      <div className="Slider-videos">
        {currentVideos.map((video) => (
          <SliderVideo
            videoInfo={video}
            key={video.id}
          />
        ))}
      </div>
      <nav className="Slider-pagination">
        <SliderPagination />
      </nav>
    </div>
  );
}
