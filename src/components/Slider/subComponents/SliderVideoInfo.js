/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from "prop-types";

const propTypes = {
    randomColorRgb01: PropTypes.string.isRequired,
    randomColorRgb05: PropTypes.string.isRequired,
    videoAuthor: PropTypes.string.isRequired,
    videoUploadDate: PropTypes.instanceOf(Date).isRequired,
    videoViewCount: PropTypes.string.isRequired,
    videoDescription: PropTypes.string.isRequired,
}

export const SliderVideoInfo = props => {
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
                <li className="Slider-video__info__author">{props.videoAuthor}</li>
                <li className="Slider-video__info__uploadDate">{props.videoUploadDate}</li>
                <li className="Slider-video__info__viewCount">{props.videoViewCount}</li>
            </ul>
            <p>{props.videoDescription}</p>
        </div>
    )
}

SliderVideoInfo.propTypes = propTypes;