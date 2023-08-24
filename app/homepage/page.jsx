import React from "react";
import { metadata } from "../layout";
import "../css/utility.css"

export default function HomePage() {
    return (
        // Name of the application
        <div className="flex flex-col h-[calc(100vh-42px)] items-center justify-around">
            <div className="flex flex-col items-center mt-2">
                <h1 className="w-full lg:w-2/3 text-blue-600 h1 text-center m-0 my-2">{metadata.description}</h1>
                <h3 className="text-center h3 m-0 my-2">{metadata.label}</h3>
            </div>
            {/* Input link and Link button*/}
            <div className="flex justify-center relative w-full lg:w-3/4 my-2">
                <span className="absolute inset-y-0 flex items-center left-4"><img src="./../link.svg" alt="link" /></span>
                <input type="link" className="rounded-xl px-10 py-2 text-lg shadow-around w-full border-transparent" placeholder="Connect your Excel link here ..." />
                <span className="absolute inset-y-0 flex items-center right-4">
                    <button type="submit" className="cursor-pointer px-10 rounded-3xl text-white-100 bg-blue-500 text-lg font-bold border-transparent shadow-around">Link</button>
                </span>
            </div>
            {/*Div contains the images of table and dashboard*/}
            <div className="flex justify-center">
                <img src="./../homepage.png" alt="Home page" className="w-[90%] -z-10 object-contain" />
            </div>
        </div>
    )
}