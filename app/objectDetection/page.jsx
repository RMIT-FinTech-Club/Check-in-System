"use client"
import { WebcamFeed } from "../../components/ObjectDetection";
import { TextDisplay } from "../../components/GetText";
import { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3000/objectDetection');

// const YourComponent = () => {
//     // State to store the signal data
//     const [signal, setSignal] = useState('');
  
//     // Listen for the 'screenshot_saved' event
//     useEffect(() => {
//       socket.on('screenshot_saved', (data) => {
//         // Handle the signal data here
//         console.log('Signal received:', data);
//         setSignal(data.message); // Update the state with the signal message
//       });
  
//       return () => {
//         // Clean up the event listener when the component unmounts
//         socket.off('screenshot_saved');
//       };
//     }, []);
  
//     return (
//       <div>
//         <h1>Check for signal</h1>
//         <p>Signal: {signal}</p>
//         {/* Your other React components */}
//       </div>
//     );
//   };

export default function Page() {

    return (
        <div className="content">
            <h1>Camera Feed</h1>
            <WebcamFeed />
            {/* <YourComponent /> */}
        </div>
    )
}