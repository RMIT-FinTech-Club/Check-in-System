import { Button, Modal, ConfigProvider, Space } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { useState } from "react";
import ManualForm from "@/components/ManualForm";
import { WebcamFeed } from "./ObjectDetection";
import { io } from "socket.io-client";


export default function CameraCheckin({ questions }) {
  // Fetch scan data when received signal
  function getScannedData() {
    fetch("/api/objectDetection/get_text")
      .then((response) => response.json())
      .then((data) => {
        setScannedData(data);
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

  const [test, setTest] = useState("test");

  const showCamera = () => {
    setCameraOpen(true);
  };

  const closeCamera = () => {
    setCameraOpen(false);
  };

  socket.on("message", (res) => {
    setIsReceived(true);
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
        <Modal
          open={cameraOpen}
          onCancel={closeCamera}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <WebcamFeed />
          {
            isReceived &&
              <ManualForm scannedData={scannedData} questions={questions} isOpen={isReceived} cancelFunc={handleClose}></ManualForm>
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
