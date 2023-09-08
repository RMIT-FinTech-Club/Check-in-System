'use client'

import { Button, Form, Input } from "antd"
import axios from "axios";
import { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";


export default function LoadingForm() {
    const [validationStatus, setValidationStatus] = useState(null);
    const [help, setHelp] = useState("");
    const [loading, setLoading] = useState(false); 
    const [url, setUrl] = useState(null);
    
    async function validateExcel(url) {
        setLoading(true);
        setValidationStatus("validating");
        setHelp("Excel link is being validated...");

        if (url != null) {
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
        else {
            setLoading(false);
            setValidationStatus("error");
            setHelp("Please insert the Excel link");
        }
    }
  
    return (
      <Form>
        <Form.Item
            validateStatus={validationStatus}
            help={help}
            style={{width: '100%', padding: '0px'}}
        >
            <Input 
            addonBefore={<LinkOutlined />} 
            onChange={(e) => setUrl(e.target.value)} 
            style={{
                width: '100%',
            }} 
            allowClear 
            size="large" 
            placeholder="Insert your Excel link..." id="error" />
        </Form.Item>
        <div style={{height: "10px"}}> </div>
        <Button
            type="primary"
            size="large"
            style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
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