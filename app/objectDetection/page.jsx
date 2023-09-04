"use client"
import { WebcamFeed } from "../../components/ObjectDetection";

export default function Page() {

    return (
        <div className="content">
            <h1>Camera Feed</h1>
            <WebcamFeed />
        </div>
    )
}