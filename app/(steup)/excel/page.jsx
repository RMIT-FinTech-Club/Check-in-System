import { Button, Input } from "antd";
import { LinkOutlined } from "@ant-design/icons";

export default function StepOnePage() {
    return (
        <div>
            {/* Dashboard contains an input element to enter Excel link and Link button */}
            {/* Contains a textfield and a "Ready" button to initiate the Link Excel phase */}
                <div>
                    <h2 className='h3 text-black-200 mb-3'>Let's get started</h2>
                    <form action="">
                        <Input addonBefore={<LinkOutlined />} size="large" allowClear placeholder="Insert your Excel link..."/>
                        <Button size="large" type="primary" style={{width:'100%'}} className="mt-4">
                            Ready
                        </Button>
                    </form>
                </div>
        </div>
    )
}
