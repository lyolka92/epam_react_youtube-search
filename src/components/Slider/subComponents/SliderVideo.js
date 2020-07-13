import React, { useState } from 'react';
import PropTypes from 'prop-types';
import hexToRgba from 'hex-to-rgba';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {SliderVideoHeader} from "./SliderVideoHeader";
import {SliderVideoInfo} from "./SliderVideoInfo";
import '../Slider.css';

const DESCRIPTION_LENGTH = 300;

function SliderVideo({ videoInfo }) {
  const getRandomColorHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const [randomColorHex] = useState(() => getRandomColorHex());
  const randomColorRgb01 = hexToRgba(randomColorHex, 0.1);
  const randomColorRgb05 = hexToRgba(randomColorHex, 0.5);

  const uploadDate = new Date(videoInfo.uploadDate).toLocaleDateString();
  const cutDescription = `${videoInfo.description.slice(0, DESCRIPTION_LENGTH)}...`;

  const style = css`
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
    <div css={style}>
      <SliderVideoHeader
          randomColorRgb01={randomColorRgb01}
          randomColorRgb05={randomColorRgb05}
          videoCoverUrl={videoInfo.imgUrl}
          videoUrl={videoInfo.videoUrl}
          videoTitle={videoInfo.title}

      />
      <SliderVideoInfo
          randomColorRgb01={randomColorRgb01}
          randomColorRgb05={randomColorRgb05}
          videoAuthor={videoInfo.author}
          videoUploadDate={uploadDate}
          videoViewCount={videoInfo.viewCount || '?'}
          videoDescription={cutDescription}
      />
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
    viewCount: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SliderVideo;
