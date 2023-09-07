'use client'

import { Form, Input } from "antd"

export default function ValidateField({status, help, children}) {
    return (       
    <Form.Item
      validateStatus={status}
      help={help}
      style={{width: '100%'}}
    >
      {children}
    </Form.Item>
    )
}