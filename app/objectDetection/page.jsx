"use client";
import { WebcamFeed } from "../../components/ObjectDetection";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Observable } from "rxjs";

export default function Page() {
  // initialize socket
  const socket = io("http://localhost:5328");
  const [screenshotStatus, setScreenshotStatus] = useState("Initializing...");

  // // RxJS test
  // const data$ = new Observable((observer) => {
  //   fetch("/api/objectDetection/queue")
  //     .then((response) => {
  //       return response;
  //     }) // or text() or blob() etc.
  //     .then((data) => {
  //       observer.next(data);
  //       observer.complete();
  //     })
  //     .catch((err) => observer.error(err));
  // });
  // data$.subscribe({
  //   next(x) {
  //     console.log(x);
  //   },
  // });
  // SSE test
  // useEffect(() => {
  //   const sse = new EventSource("/api/objectDetection/queue");
  //   sse.addEventListener("message", (res) => {
  //     console.log(res.data);
  //     setScreenshotStatus("Receive an event");
  //   });

  //   return () => {
  //     console.log("Close event source");
  //     sse.close();
  //   };
  // }, []);

  // socket io test
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
