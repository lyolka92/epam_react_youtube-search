import React, { useState } from 'react';
import PropTypes from 'prop-types';
import hexToRgba from 'hex-to-rgba';
import './Slider.css';

function SliderVideo({ videoInfo }) {
  const getRandomColorHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const [randomColorHex] = useState(() => getRandomColorHex());
  const randomColorRgb01 = hexToRgba(randomColorHex, 0.1);
  const randomColorRgb05 = hexToRgba(randomColorHex, 0.5);

  const videoCardStyle = {
    backgroundImage: `linear-gradient(${randomColorRgb01}, ${randomColorRgb05}),
        linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.5)),
        url(${videoInfo.imgUrl})`,
  };

  const uploadDate = new Date(videoInfo.uploadDate).toLocaleDateString();
  const DESCRIPTION_LENGTH = 300;
  const cutDescription = `${videoInfo.description.slice(0, DESCRIPTION_LENGTH)}...`;

  return (
    <div className="Slider-video">
      <div className="Slider-video__header" style={videoCardStyle}>
        <h2>
          <a href={videoInfo.videoUrl}>{videoInfo.title}</a>
        </h2>
      </div>
      <div className="Slider-video__info" style={{ backgroundColor: randomColorRgb01 }}>
        <ul
          style={{ borderBottomColor: randomColorRgb05 }}
        >
          <li className="Slider-video__info__author">{videoInfo.author}</li>
          <li className="Slider-video__info__uploadDate">{uploadDate}</li>
          <li className="Slider-video__info__viewCount">{videoInfo.viewCount}</li>
        </ul>
        <p className="Slider-video__info__description">{cutDescription}</p>
      </div>
    </div>
  );
}

SliderVideo.propTypes = {
  videoInfo: PropTypes.exact({
    imgUrl: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    uploadDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    viewCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default SliderVideo;
