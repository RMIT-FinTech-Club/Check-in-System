"use client";
import { WebcamFeed } from "../../components/ObjectDetection";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function Page() {
  // initialize socket
  const socket = io("http://localhost:5328");
  const [screenshotStatus, setScreenshotStatus] = useState("Initializing...");

  // socket io
  socket.on("message", (res) => {
    console.log(res);
    setScreenshotStatus("Receive an event");
  });
  return (
    <div className="content">
      <h1>Camera Feed</h1>
      <WebcamFeed />
      <p>ScreenshotStatus: {screenshotStatus}</p>
    </div>
  );
}
