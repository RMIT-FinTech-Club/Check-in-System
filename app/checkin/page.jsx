"use client";
import StepBar from "../components/StepBar";

import { CameraOutlined } from "@ant-design/icons";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Question from "../utils/Question";
import ManualForm from "../components/ManualForm";

/**
 * A react component representing the checkin page
 */
export default function Checkin() {
  // Loading the questions information from the local storage
  const questions = JSON.parse(localStorage.getItem("questions")).map(
    (val) => new Question(val)
  );

  // Handling modal opening and closing
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="content">
      <button
        onClick={() => {
          console.log(questions);
        }}
      >
        Log
      </button>
      <div className=" flex flex-col text-center">
        <h1 className="h1 text-blue-100"> Checker </h1>
        <h3 className="h3 mt-0">Your Check-in setups is ready</h3>
      </div>

      <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <StepBar index={3}></StepBar>

        {/* Modal for manual input form */}
        <Modal
          open={open}
          // onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          width={1000}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <h1 className="h2 text-center"> Manual Input Form </h1>
          {/* Manual Input form component */}
          <ManualForm questions={questions}></ManualForm>
        </Modal>

        {/* Camera Button for opening camera and future checkin functions */}
        <div className="flex flex-col px-40">
          <p className="h3 text-center">
            {" "}
            Click on the camera to start recording{" "}
          </p>
          <div className="flex justify-center">
            <Button
              className=" h-40 w-40 border-none flex justify-center items-center "
              onClick={() => {}}
            >
              <CameraOutlined style={{ fontSize: "1000%" }} />
            </Button>
          </div>

          {/* Manual Input Button */}
          <Button ghost className=" mt-4 " type="primary" onClick={showModal}>
            <span className="text-black-100"> Manual Input </span>
          </Button>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="mx-4 font-bold text-black-200 hidden p-4">
            Previous
          </Button>
        </div>
      </Card>
    </div>
  );
}
