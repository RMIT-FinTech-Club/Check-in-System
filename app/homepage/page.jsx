import React from "react";
import { metadata } from "../layout";
import "../css/utility.css"

export default function HomePage() {
    return (
        // Name of the application
        <div className="">
            <div className="text-center flex flex-col items-center my-4 py-4">
                <h1 className="w-1/3 text-blue-600 font-inter">{metadata.description}</h1>
                <h3 className="font-inter">{metadata.label}</h3> 
            </div>
        {/* Input link and Link button*/}
            <div className="flex justify-center my-8 py-4 relative">
                <span className="absolute inset-y-0 flex items-center left-4"><img src="./../link.svg" alt="link" /></span>
                <input type="link" className="rounded-xl px-8 py-2 mx-2 text-lg shadow-xl w-full" placeholder="Connect your Excel link here ..."/>
                <span className="absolute inset-y-0 flex items-center right-4"><button type="submit" className="cursor-pointer px-10 py-1 rounded-2xl text-white bg-blue-500 text-lg">Link</button></span>
            </div>
            {/*Div contains the images of table and dashboard*/}
            <div className="relative my-5 flex justify-center">
                <img src="./../table.svg" alt="table" className="w-[50%]" />
                {/* <img src="./../excel_automation.svg" alt="excel automation" className="absolute z-10 w-[30%] " /> */}
                <img src="./../blue_column_tag.svg" alt="blue column tag" className="absolute right-[245px] top-1" />
                {/* <img src="./../arrow_lg.svg" alt="arrow large" className="absolute" />
                <img src="./../arrow_md.svg" alt="arrow medium" className="absolute" />
                <img src="./../arrow_sm.svg" alt="arrow small" className="absolute" /> */}
            </div>

            {/* Hard code table */}

            {/* <div className="my-8 py-4 relative">
                Table with name and sid
                <div className="">
                    <table className="w-1/2 mx-auto custom-border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="custom-padding font-semibold rounded-tl-md rounded-bl-md">Name</th>
                                <th className="custom-padding font-semibold rounded-tr-md rounded-br-md">SID</th>
                            </tr>
                        </thead>
                        <tbody className="[&>tr>*:nth-child(even)]:">
                            <tr className="">
                                <td className="custom-padding border-bottom">Do Tung Lam</td>
                                <td className="custom-padding">s3963286</td>
                            </tr>
                            <tr className="">
                                <td className="custom-padding">Hoang Thai Phuc</td>
                                <td className="custom-padding">s3978081</td>
                            </tr>
                            <tr className="">
                                <td className="custom-padding">Nguyen Hoang Minh</td>
                                <td className="custom-padding">s3977773</td>
                            </tr>
                            <tr className="">
                                <td className="custom-padding">Hoang Nguyen Nhat Minh</td>
                                <td className="custom-padding">s3977856</td>
                            </tr>
                            <tr className="">
                                <td className="custom-padding">Nguyen Minh Nguyen</td>
                                <td className="custom-padding">s3927220</td>
                            </tr>
                            <tr className="">
                                <td className="custom-padding">Huynh Duc Gia Tin</td>
                                <td className="custom-padding">s3962053</td>
                            </tr>
                            <tr className="">
                                <td className="custom-padding">Tran Nguyen Anh Minh</td>
                                <td className="custom-padding">s3979367</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                Dashboard
                <div className="absolute border">
                    <h2>Autofill</h2>
                    <h2>Excel automation</h2>
                    <h3>Insert information right onto your excel</h3>
                </div>
            </div> */}
        </div>
    )
}