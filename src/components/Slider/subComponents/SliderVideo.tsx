import React from "react";
import hexToRgba from "hex-to-rgba";
import styled from "@emotion/styled";
import { SliderVideoHeader } from "./SliderVideoHeader";
import { SliderVideoInfo } from "./SliderVideoInfo";
import { Video } from "../../../types/Video";
import "../Slider.css";

const DESCRIPTION_LENGTH = 300;

type SliderVideoProps = {
  videoInfo: Video;
};

export const SliderVideo: React.FC<SliderVideoProps> = ({ videoInfo }) => {
  const getRandomColorHex = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const randomColorHex = getRandomColorHex();
  const randomColorRgb01 = hexToRgba(randomColorHex, 0.1);
  const randomColorRgb05 = hexToRgba(randomColorHex, 0.5);

  const cutDescription = `${videoInfo.description.slice(
    0,
    DESCRIPTION_LENGTH
  )}...`;

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
        videoCoverUrl={videoInfo.imgUrl.href}
      >
        <h2>
          <a href={videoInfo.videoUrl.href}>{videoInfo.title}</a>
        </h2>
      </SliderVideoHeader>
      <SliderVideoInfo
        randomColorRgb01={randomColorRgb01}
        randomColorRgb05={randomColorRgb05}
        videoAuthor={videoInfo.author}
        videoUploadDate={videoInfo.uploadDate}
        videoViewCount={videoInfo.viewCount}
        videoDescription={cutDescription}
      />
    </SliderVideoContainer>
  );
};
