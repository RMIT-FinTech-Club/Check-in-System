'use client'

import { Button, Form, Input } from "antd"
import axios from "axios";
import { useState } from "react";
import socket from "lib/socketManager";
import isUrl from "is-url";

export default function LoadingForm() {
    const [validationStatus, setValidationStatus] = useState(null);
    const [help, setHelp] = useState("");
    const [loading, setLoading] = useState(false); 
    const [url, setUrl] = useState(null);
    
    async function validateExcel(url) {
        setLoading(true);
        setValidationStatus("validating");
        setHelp("Excel link is being validated...");
        socket.on('update_proccess', (state) => {
            setHelp(state);
        })

        try {
            if (!isUrl(url.trim())) {
                throw new Error("Please enter a valid Excel link");
            }

            await axios.post('/api/excel/access', {
                url: url,
                email: 'itslamemail@gmail.com',
                password: 'p20030917!1'
            });

            // Check if url already existed
            let id;
            try {
                // Try getting id from url
                const response = await axios.get('/api/excelData/db/id', {
                    params: {
                        url,
                    }
                });
                id = response.data.id;

            } catch (error) {
                console.log('Data not yet existed, creating new data');

                // Create new data with the url
                axios.post('/api/excelData/db', {
                    url: url,
                    questions: []
                });

                // Get id from the newly created data
                const response = await axios.get('/api/excelData/db/id', {
                    params: {
                        url,
                    }
                });

                id = response.data.id;

            }

            setLoading(false);
            // setHelp("The Excel link is valid");
            // router.replace('/setup');
            window.location.href = `/${id}/setup`;
            
        } catch (error) {
            setLoading(false);
            setValidationStatus("error");
            setHelp("There was an error connection to the Excel link. Please try again.");
        }
    }

    return (
      <Form className='relative mt-14'>
        <Form.Item
            validateStatus={validationStatus}
            help={help}
            style={{width: '100%'}}
            >
            <Input className="excel_input" onChange={(e) => setUrl(e.target.value)} style={{padding: '16px 140px 16px 16px', width: '100%'}} allowClear size="large" placeholder="Connect your Excel link here..." id="error"
            prefix={
            <svg className="w-5 h-5 text-black-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"/>
            </svg>
            } />

        </Form.Item>
        <Button
            type="primary"
            size="large"
            style={{
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            right: '10px', // Adjust this value as needed
            top: '35%',
            backgroundColor: 'white',
            color: 'black',
            transform: 'translateY(-50%)',
            }}
            loading={loading}
            onClick={() => {
                validateExcel(url);
            }}
            htmlType="submit"
        >
            Connect
        </Button>
    </Form>
    )
}