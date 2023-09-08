'use client'

import { Button, Form, Input } from "antd"
import axios from "axios";
import { useState } from "react";

export default function LoadingForm() {
    const [validationStatus, setValidationStatus] = useState(null);
    const [help, setHelp] = useState("");
    const [loading, setLoading] = useState(false); 
    const [url, setUrl] = useState(null);
    
    async function validateExcel(url) {
        setLoading(true);
        setValidationStatus("validating");
        setHelp("Excel link is being validated...");

        try {
            console.log(url)
            const response = await axios.post('/api/excel/access', {
                url: url,
                email: 'itslamemail@gmail.com',
                password: 'p20030917!1'
            });
            setLoading(false);
            setHelp("The Excel link is valid");
            // router.replace('/setup');
            window.location.href = '/setup';
            
          } catch (error) {
            setLoading(false);
            setValidationStatus("error");
            setHelp("The Excel link is invalid");
          }
    }
    // useEffect(() => {
    //   if () {
    //     setValidationStatus("error")
    //     setHelp("The Excel link is invalid")
    //   }
    //   if (loading) {
    //     setValidationStatus("validating")
    //     setHelp("The Excel link is being validated...")
    //   }
    //   else {
    //     setValidationStatus("")
    //     setHelp("")
    //   }
    // },[loading])
  
    return (
      <Form className='relative mt-14'>
        <Form.Item
            validateStatus={validationStatus}
            help={help}
            style={{width: '100%'}}
            >
            <Input onChange={(e) => setUrl(e.target.value)} style={{padding: '16px 140px 16px 16px', width: '100%'}} allowClear size="large" placeholder="Connect your Excel link here..." id="error"
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