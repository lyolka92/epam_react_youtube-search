import React from "react";
import hexToRgba from "hex-to-rgba";
import "./Slider.css";

function SliderVideo(props) {
    const uploadDate = new Date(props.videoInfo.uploadDate).toLocaleDateString();

    const randomColorHex = "#" + Math.floor(Math.random()*16777215).toString(16);
    const randomColorRgb01 = hexToRgba(randomColorHex, 0.1);
    const randomColorRgb05 = hexToRgba(randomColorHex, 0.5);

    return (
        <div className="Slider-video">
            <div
                className="Slider-video__header"
                style={{backgroundImage: `linear-gradient(${randomColorRgb01}, ${randomColorRgb05}),
                                          linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.5)),
                                          url(${props.videoInfo.imgUrl})`}}>
                <h2>
                    <a href={props.videoInfo.videoUrl}>{props.videoInfo.title}</a>
                </h2>
            </div>
            <div
                className="Slider-video__info"
                style={{backgroundColor: randomColorRgb01}}
            >
                <ul
                style={{borderBottomColor: randomColorRgb05}}>
                    <li className="Slider-video__info__author">{props.videoInfo.author}</li>
                    <li className="Slider-video__info__uploadDate">{uploadDate}</li>
                    <li className="Slider-video__info__viewCount">{props.videoInfo.viewCount}</li>
                </ul>
                <p className="Slider-video__info__description">{props.videoInfo.description.slice(0, 300) + "..."}</p>
            </div>
        </div>
    )
}

export default SliderVideo;
