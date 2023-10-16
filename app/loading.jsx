import { Spin } from "antd";

export default function Loading() {
    return (
        <div className="content text-center">
            <h1 className="h1 text-blue-100 font-jomhuria"> Checker </h1>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </div>
    )
}