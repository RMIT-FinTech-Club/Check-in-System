"use client"
import { useState } from "react";
import { Button } from "antd";
import axios from "axios"


export default function Page() {

    const [responseData, setResponseData] = useState();

    const [cell, setCell] = useState();

    const [data, setData] = useState();
    
    const [headerPosition, setHeaderPosition] = useState();

    const [name, setName] = useState('');

    const [id, setId] = useState('');

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

    async function goToCell() {
      try {
          const response = await axios.post('/api/excel/go-to-cell', {
            cell_position: cell
          });
          setResponseData(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
    }

    async function addData() {
      try {
          const response = await axios.post('/api/excel/add-data', {
            data: data
          });
          setResponseData(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
    }

    async function getFileName() {
      try {
          const response = await axios.post('/api/excel/get-file-name', {});
          setResponseData(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
    }

    async function queryHeaders() {
      try {
          const response = await axios.post('/api/excel/query-headers', {
            header_position : headerPosition
          });
          setResponseData(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
    }

    async function submitDataToRow() {
      try {
          const response = await axios.post('/api/excel/add-data-to-new-row', {
              data: [name, id]
          });
          setResponseData(response.data);
  
          // Clear the input fields after successful submission
          setName('');  
          setId('');
      } catch (error) {
          console.error('Error submitting data:', error);
      }
    }
  

    return (
        <div className="content">
            <h1>This will test the api</h1>
            {responseData && <p>{JSON.stringify(responseData, null, 2)}</p>}
            <div className="mt-4 [&>*]:m-2">
                <Button onClick={accessExcel}>Access Excel</Button>
                <Button onClick={testExcel}>Test Excel</Button>
                <Button onClick={dcExcel}>Disconnect Excel</Button>
                <Button onClick={getFileName}>Get Excel file name</Button>

                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <Button onClick={goToCell}>Go to cell</Button>
                    <input className="p-1 border border-gray-300 rounded-md"
                     type="text" placeholder="input cell"
                     onChange={e => setCell(e.target.value)} />
                  </div>

                  <div className="flex gap-3 items-center">
                    <Button onClick={addData}>Add data</Button>
                    <input className="p-1 border border-gray-300 rounded-md"
                     type="text" placeholder="input data"
                     onChange={e => setData(e.target.value)} />
                  </div>

                  <div className="flex gap-3 items-center">
                    <Button onClick={queryHeaders}>Query headers</Button>
                    <input className="p-1 border border-gray-300 rounded-md"
                     type="text" placeholder="input data"
                     onChange={e => setHeaderPosition(e.target.value)} />
                  </div>

                  <div className="flex gap-3 items-center">

                    <input className="p-1 border border-gray-300 rounded-md" type="text" 
                          placeholder="Name" value={name} 
                          onChange={e => setName(e.target.value)} />
                          
                    <input className="p-1 border border-gray-300 rounded-md" type="text" 
                          placeholder="ID" value={id} 
                          onChange={e => setId(e.target.value)} />

                    <Button onClick={submitDataToRow}>Submit</Button>

                  </div>

                </div>
            </div>
        </div>
    )
}