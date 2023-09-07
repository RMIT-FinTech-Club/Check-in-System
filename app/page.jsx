'use client'
import { metadata } from "./layout";
import LoadingButton from "@/components/LoadingButton";
import { Form, Input } from "antd";
import ValidateField from "@/components/validateField";
import { useState, useEffect } from 'react';

export default function Home() {
  const [validationStatus, setValidationStatus] = useState("");
  const [help, setHelp] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (console.error) {
      setValidationStatus("error")
      setHelp("The Excel link is invalid")
    }
    if (loading) {
      setValidationStatus("validating")
      setHelp("The Excel link is being validated...")
    }
    else {
      setValidationStatus("")
      setHelp("")
    }
  },[loading])

  const updateLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    // Name of the application
    <div className="content text-center">
      <h1 className="text-blue-100 h1">{metadata.description}</h1>
      <h3 className="p mt-5 mb-10">{metadata.label}</h3>

      {/* Input link and Link button*/}
      <Form className='relative mt-14'>
        <ValidateField status={validationStatus} help={help}>
          <Input style={{padding: '16px 100px 16px 16px', width: '100%'}} size="large" placeholder="Connect your Excel link here..." id="error"
          prefix={
            <svg className="w-5 h-5 text-black-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"/>
          </svg>
          }/>
        </ValidateField>
        <LoadingButton
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
          onUpdateLoading={updateLoadingState}
        >
            Connect
        </LoadingButton>
      </Form>

      <div className="mt-12">
        <img src="./../homepage.svg" alt="Checkin and Excel automation" />
      </div>
      {/* Description image */}
    </div>
  )
}
