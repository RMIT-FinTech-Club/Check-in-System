"use client"
import { useState } from "react";
import axios from "axios"


export default function Page() {

    const [responseData, setResponseData] = useState();

    async function accessExcel() {
        try {
            const response = await axios.post('/api/excel/access', {
                url: 'https://rmiteduau.sharepoint.com/:x:/r/sites/RMITFinTechClub2023/Shared%20Documents/2023%20FinTech%20Club%20Master%20Folder/Sem%20B/Departments/Technology/Computer%20Vision%20Project/Book.xlsx?d=wc133eaeca703446686947dd77f977172&csf=1&web=1&e=Tl81AC',
                email: 'itslamemail@gmail.com',
                password: 'p20030917!1'
            });
            setResponseData(response.data)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
    }

    async function testExcel() {
        try {
            const response = await axios.post('/api/excel/test-selenium', {})
            setResponseData(response.data)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
    }

    async function dcExcel() {
        try {
            const response = await axios.post('/api/excel/disconnect', {})
            setResponseData(response.data)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
    }

    return (
        <div className="content">
            <h1>This will test the api</h1>
            {responseData && <p>{JSON.stringify(responseData, null, 2)}</p>}
            <div>
                <button onClick={accessExcel}>access Excel</button>
                <button onClick={testExcel}>test Excel</button>
                <button onClick={dcExcel}>disconnect Excel</button>
            </div>
        </div>
    )
}