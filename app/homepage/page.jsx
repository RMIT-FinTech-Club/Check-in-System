import React from "react";
import { metadata } from "../layout";
import "../css/utility.css"

export default function HomePage() {
    return (
        // Name of the application
        <div className="flex flex-col max-h-screen items-center">
            <div className="text-center flex flex-col items-center">
                <h1 className="w-full lg:w-2/3 text-blue-600 h1 text-center m-0 py-2 my-4">{metadata.description}</h1>
                <h3 className="text-center h3 m-0 py-2">{metadata.label}</h3>
            </div>
            {/* Input link and Link button*/}
            <div className="flex justify-center py-3 relative w-full lg:w-3/4">
                <span className="absolute inset-y-0 flex items-center left-4"><img src="./../link.svg" alt="link" /></span>
                <input type="link" className="rounded-xl px-8 py-2 mx-2 text-lg shadow-around w-full border-transparent" placeholder="Connect your Excel link here ..." />
                <span className="absolute inset-y-0 flex items-center right-4">
                    <button type="submit" className="cursor-pointer px-10 rounded-3xl text-white-100 bg-blue-500 text-lg font-bold border-transparent shadow-around">Link</button>
                </span>
            </div>
            {/*Div contains the images of table and dashboard*/}
            <div className="flex justify-center">
                <img src="./../homepage.svg" alt="Home page" className="w-full relative -z-10 -mt-28 md:-mt-40 lg:-mt-60" />
            </div>
        </div>
    )
}