import React from "react";

export const WebcamFeed = () => {
    return (
        <img
            // src={"/api/objectDetection/video_feed"}
            src={`/api/objectDetection/video_feed?${Date.now()}`}
            // src={"http://localhost:3000/api/objectDetection/video_feed"}
            // width="640"
            // height="480"
            alt="Camera Feed"
        />
    )
}
