import { Button, Modal, ConfigProvider, Space } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { useState } from "react";
import ManualForm from "@/components/ManualForm";

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
              // contentBg: "transparent",
            },
          },
        }}
      >
        <Modal
          // style={{ top: 0, left: 0 }}
          open={cameraOpen}
          onCancel={closeCamera}
          width={1000}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <img
            src="https://repository-images.githubusercontent.com/387449953/0eb6de0d-1778-4e09-87e1-adf7ea9b0684"
            alt="Sample"
            className=" mt-6"
          />
          <ManualForm questions={questions}></ManualForm>
        </Modal>
        <div className="flex justify-center">
          <Button
            className=" h-40 w-40 border-none flex justify-center items-center "
            onClick={showCamera}
          >
            <CameraOutlined style={{ fontSize: "1000%" }} />
          </Button>
        </div>
      </ConfigProvider>
    </>
  );
}
