import { Button, Modal, ConfigProvider, Space } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { useState } from "react";
import ManualForm from "@/components/ManualForm";
import { WebcamFeed } from "./ObjectDetection";

export default function CameraCheckin({ questions }) {
  // Handling camera opening and closing
  const [cameraOpen, setCameraOpen] = useState(false);
  const showCamera = () => {
    setCameraOpen(true);
  };

  const closeCamera = () => {
    setCameraOpen(false);
  };

  // Handling open manual input form
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
          <ManualForm questions={questions}></ManualForm>
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
