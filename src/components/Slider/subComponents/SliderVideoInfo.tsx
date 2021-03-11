/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

type SliderVideoInfoProps = {
  randomColorRgb01: string;
  randomColorRgb05: string;
  videoAuthor: string;
  videoUploadDate: Date;
  videoViewCount: number;
  videoDescription: string;
};

export const SliderVideoInfo: React.FC<SliderVideoInfoProps> = (props) => {
  const style = css`
    height: calc(100% - 320px);
    padding: 2rem;
    background-color: ${props.randomColorRgb01};
    border-radius: 0 0 3rem 3rem;
    overflow: scroll;

    & ul {
      margin: 0;
      padding: 0 0 1rem;
      list-style: none;
      border-bottom: 4px dotted ${props.randomColorRgb05};
    }

    & p {
      padding-top: 1rem;
      word-break: break-word;
    }
  `;

  return (
    <div css={style}>
      <ul>
        <li className="slider-video__info__author">{props.videoAuthor}</li>
        <li className="slider-video__info__uploadDate">
          {props.videoUploadDate.toLocaleDateString()}
        </li>
        <li className="slider-video__info__viewCount">
          {props.videoViewCount}
        </li>
      </ul>
      <p>{props.videoDescription}</p>
    </div>
  );
};
