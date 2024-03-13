import { Button, Modal, ConfigProvider, Space, notification } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import ManualForm from "@/components/ManualForm";
import { WebcamFeed } from "./ObjectDetection";
import { io } from "socket.io-client";

export default function CameraCheckin({ questions }) {
    function notifySuccess() {
        api['success']({
            message: "Success",
            description: "Update successfully",
            duration: 1.5,
        });
    }

    function notifyError() {
        api['error']({
            message: "Error",
            description: "Update failed",
            duration: 1.5,
        });
    }

    // Fetch scan data when received signal
    async function getScannedData() {
        await fetch("/api/objectDetection/get_textTesseract")
            .then((response) => response.json())
            .then((data) => {
                if (data.ID) {
                    setScannedData(data);
                }
            })
            .catch((err) => console.log(err));
    }

    function handleClose() {
        setIsReceived(false);
    }


    const socket = io("http://localhost:5328");


    // Handling camera opening and closing
    const [cameraOpen, setCameraOpen] = useState(false);
    const [isReceived, setIsReceived] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const [dataErr, setDataErr] = useState(false);
    const [api, contextHolder] = notification.useNotification(); // Managing pop up message when submit form

    const showCamera = () => {
        setCameraOpen(true);
    };

    const closeCamera = () => {
        setCameraOpen(false);
    };

    const cancelFunc = () => {
        handleClose();
        setIsReceived(false);
    }

    socket.on("message", (_) => {
        if (!getScannedData()) {
            setDataErr(true);
            console.log("Failed to extract data, maybe try scanning again?");
            return;
        }

        setIsReceived(true);
        setCameraOpen(false);
    });

    return (
        <>
            {/* Config provider for modifying modal attributes */}
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: "transparent",
                            boxShadow: "none",
                            color: "#000000",
                            padding: "0px",
                            colorIcon: "#000000",
                        },
                    },
                }}
            >
                {contextHolder}
                <Modal
                    open={cameraOpen}
                    onCancel={closeCamera}
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}>
                    <WebcamFeed />
                    {dataErr && <p>Failed to extract data, maybe try scanning again?</p>}
                </Modal>
                {
                    (isReceived && scannedData) &&
                    <ManualForm scannedData={scannedData} questions={questions} isOpen={isReceived} cancelFunc={cancelFunc} notifySuccess={notifySuccess} notifyError={notifyError}></ManualForm>
                }
                <div className="inline">
                    <Button
                        onClick={showCamera}
                        icon={<CameraOutlined style={{ fontSize: '20px', color: '#000000' }} />}
                        style={{ width: "40px", height: "40px" }}
                    >
                    </Button>
                </div>
            </ConfigProvider>
        </>
    );
}
