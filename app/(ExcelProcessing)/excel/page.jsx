'use client'

import { Button, Input } from "antd";
import ExcelChecking from "@/components/ExcelChecking";
import { LinkOutlined } from "@ant-design/icons";

export default function StepOnePage() {
    return (
        <div>
            {/* Dashboard contains an input element to enter Excel link and Link button */}
            {/* Contains a textfield and a "Ready" button to initiate the Link Excel phase */}
                <div>
                    <h2 className='h3 text-black-200 mb-5'>Let's get started</h2>
                    
                    {/* Excel Link and Ready Button */}
                    <ExcelChecking />
                </div>
        </div>
    )
}
