'use client'
import { metadata } from "./layout";
import LoadingButton from "@/components/LoadingButton";
import { Form, Input } from "antd";
import ValidateField from "@/components/validateField";

export default function Home() {
  return (
    // Name of the application
    <div className="content text-center">
      <h1 className="text-blue-100 h1">{metadata.description}</h1>
      <h3 className="p mt-5">{metadata.label}</h3>

      {/* Input link and Link button*/}
      <form>   
          <div className="relative mt-14">
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none focus:none">
                <svg className="w-5 h-5 text-black-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"/>
                </svg>
              </div>
              <input type="text" className="block w-full p-4 pl-12 border border-black-200 shadow rounded-lg focus:ring-blue-100 focus:border-blue-100" placeholder="Connect your Excel link here..." required />

              {/* Loading Button */}
              <LoadingButton
              size="large"
              style={{
                position: 'absolute',
                right: '10px', // Adjust this value as needed
                top: '50%',
                transform: 'translateY(-50%)',
              }}>
                Connect
              </LoadingButton>
          </div>
      </form>
      <Form className='flex items-center mt-14 border border-black-200 shadow rounded-lg focus:ring-blue-100 focus:border-blue-100'>
        {/* <ValidateField>
          <Input className="w-full" bordered={false} size="large" placeholder="Connect your Excel link here..." id="error"
          prefix={
            <svg className="w-5 h-5 text-black-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"/>
          </svg>
          }/>
        </ValidateField> */}
        {/* <LoadingButton
          size="large"
        >
            Connect
        </LoadingButton> */}
        {/* <button>test</button> */}
        <Form.Item
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
      style={{width: '100%'}}
    >
      <Input style={{width: '100%'}} bordered={false} placeholder="unavailable choice" id="error" />
    </Form.Item>
      </Form>

      <div className="mt-12">
        <img src="./../homepage.svg" alt="Checkin and Excel automation" />
      </div>
      {/* Description image */}
    </div>
  )
}
