/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

type SliderVideoHeaderProps = {
  randomColorRgb01: string;
  randomColorRgb05: string;
  videoCoverUrl: string;
  children: any;
};

export const SliderVideoHeader: React.FC<SliderVideoHeaderProps> = (props) => {
  const style = css`
    position: relative;
    flex-basis: 320px;
    flex-shrink: 3;
    margin: 0;
    background-image: linear-gradient(
        ${props.randomColorRgb01},
        ${props.randomColorRgb05}
      ),
      linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5)),
      url(${props.videoCoverUrl});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 3rem 3rem 0 0;

    & h2 {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      text-align: center;
      word-break: break-word;
    }

    & a {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 1rem 0;
      color: rgb(103, 76, 193);

      &:hover {
        color: rgb(162, 139, 252);
      }
    }
  `;

  return <div css={style}>{props.children}</div>;
};
