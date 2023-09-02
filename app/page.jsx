import React from "react";
import { metadata } from "./layout";

export default function Home() {
  return (
    // Name of the application
    <div className="content text-center">
      <h1 className="text-blue-100 h1 mt-20">{metadata.description}</h1>
      <h3 className="p mt-5">{metadata.label}</h3>

      {/* Input link and Link button*/}
    <form>   
        <div className="relative mt-14">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none focus:none">
              <svg className="w-5 h-5 text-black-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"/>
              </svg>
            </div>
            <input type="text" className="block w-full p-4 pl-12 border border-black-200 shadow rounded-lg focus:ring-blue-100 focus:border-blue-100" placeholder="Connect your Excel link here..." required />
            <button type="submit" className="text-white-100 absolute right-2.5 top-1/2 -translate-y-1/2 bg-blue-100 hover:ring-2 duration-300 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 ">Connect</button>
        </div>
    </form>

    <div className="mt-12">
      <img src="./../homepage.svg" alt="Checkin and Excel automation" />
    </div>
    {/* Description image */}

    </div>
  )
}
