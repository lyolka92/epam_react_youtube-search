import React from "react";
import SliderVideo from "./SliderVideo";
import SliderPagination from "./SliderPagination";
import "./Slider.css";

function Slider(props) {
    if (props.loading) {
        return (
            <div className="Slider Slider__empty">
                <p>
                    <span role="img" aria-label="stars">✨</span>
                    Magic is happening
                    <span role="img" aria-label="stars">✨</span>
                </p>
            </div>
        )
    }

    if (props.videos.length === 0) {
        return (
            <div className="Slider Slider__empty">
                <p>There is no videos yet.
                    <br/>
                    Try to search something magical
                    <span role="img" aria-label="stars">✨</span>
                </p>
            </div>
        )
    }

    return (
        <div className="Slider">
            <div className="Slider-videos">
                {props.videos.map(video => (
                    <SliderVideo
                        videoInfo={video}
                        key={video.id}/>
                ))}
            </div>
            <nav className="Slider-pagination">
                <SliderPagination
                    totalVideosCount={props.totalVideosCount}
                    videosPerPage={props.videosPerPage}
                    currentPage={props.currentPage}
                    setCurrentPage={props.setCurrentPage}/>
            </nav>
        </div>
    )
}

export default Slider;
