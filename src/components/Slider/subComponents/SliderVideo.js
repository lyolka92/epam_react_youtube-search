import React from "react";
import PropTypes from 'prop-types';
import hexToRgba from 'hex-to-rgba';
import styled from "@emotion/styled";
import { SliderVideoHeader } from "./SliderVideoHeader";
import { SliderVideoInfo } from "./SliderVideoInfo";
import '../Slider.css';

const DESCRIPTION_LENGTH = 300;

function SliderVideo({ videoInfo }) {
  const getRandomColorHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const randomColorHex = getRandomColorHex();
  const randomColorRgb01 = hexToRgba(randomColorHex, 0.1);
  const randomColorRgb05 = hexToRgba(randomColorHex, 0.5);

  const uploadDate = new Date(videoInfo.uploadDate).toLocaleDateString();
  const cutDescription = `${videoInfo.description.slice(0, DESCRIPTION_LENGTH)}...`;

  const SliderVideoContainer = styled.div`
    position: relative;
    flex-basis: 450px;
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 3rem;
    border: none;
    
    &:last-child {
      margin-right: 0;
    }
  `;

  return (
    <SliderVideoContainer>
      <SliderVideoHeader
          randomColorRgb01={randomColorRgb01}
          randomColorRgb05={randomColorRgb05}
          videoCoverUrl={videoInfo.imgUrl}
      >
        <h2>
          <a href={videoInfo.videoUrl}>{videoInfo.title}</a>
        </h2>
      </SliderVideoHeader>
      <SliderVideoInfo
          randomColorRgb01={randomColorRgb01}
          randomColorRgb05={randomColorRgb05}
          videoAuthor={videoInfo.author}
          videoUploadDate={uploadDate}
          videoViewCount={videoInfo.viewCount || '?'}
          videoDescription={cutDescription}
      />
    </SliderVideoContainer>
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
    viewCount: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SliderVideo;
