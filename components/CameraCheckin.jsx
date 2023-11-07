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
    await fetch("/api/objectDetection/get_text")
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
  const [api, contextHolder] = notification.useNotification(); // Managing pop up message when submit form
  
  const showCamera = () => {
    setCameraOpen(true);
  };

  const closeCamera = () => {
    setCameraOpen(false);
  };

  socket.on("message", (res) => {
    setIsReceived(true);
    getScannedData();
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
              padding: "0px",
              colorIcon: "#00000",
            },
          },
        }}
      >
        {contextHolder}
        <Modal
          open={cameraOpen}
          onCancel={closeCamera}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <WebcamFeed />
          {
            (isReceived && scannedData) &&
              <ManualForm scannedData={scannedData} questions={questions} isOpen={isReceived} cancelFunc={() => {handleClose(); setIsReceived(false)}} notifySuccess={() => notifySuccess()} notifyError={() => notifyError()}></ManualForm>
          }
        </Modal>
        <div className="flex justify-center">
          <Button
            onClick={showCamera}
            icon={<CameraOutlined style={{fontSize: '100px'}}/>}
            style={{width: "150px", height: "130px"}}
          >
          </Button>
        </div>
      </ConfigProvider>
    </>
  );
}
