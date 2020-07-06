import React from 'react';
import PropTypes from 'prop-types';
import SliderVideo from './SliderVideo';
import SliderPagination from './SliderPagination';
import './Slider.css';

function Slider({
  loading, videos, totalVideosCount, videosPerPage, currentPage, setCurrentPage,
}) {
  if (loading) {
    return (
      <div className="Slider Slider__empty">
        <p>
          <span role="img" aria-label="stars">✨</span>
          Magic is happening
          <span role="img" aria-label="stars">✨</span>
        </p>
      </div>
    );
  }

  if (totalVideosCount === 0) {
    return (
      <div className="Slider Slider__empty">
        <p>
          There is no videos yet.
          <br />
          Try to search something magical
          <span role="img" aria-label="stars">✨</span>
        </p>
      </div>
    );
  }

  return (
    <div className="Slider">
      <div className="Slider-videos">
        {videos.map((video) => (
          <SliderVideo
            videoInfo={video}
            key={video.id}
          />
        ))}
      </div>
      <nav className="Slider-pagination">
        <SliderPagination
          totalVideosCount={totalVideosCount}
          videosPerPage={videosPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </nav>
    </div>
  );
}

Slider.propTypes = {
  loading: PropTypes.bool.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object),
  totalVideosCount: PropTypes.number,
  videosPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  videos: [],
  totalVideosCount: 0,
  videosPerPage: 0,
  currentPage: 0,
};

export default Slider;
