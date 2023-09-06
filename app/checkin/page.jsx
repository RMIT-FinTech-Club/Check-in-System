"use client";

import { Button, Card, Modal } from "antd";
import { useState } from "react";
import ManualForm from "@/components/ManualForm";
import StepBar from "@/components/StepBar";
import CameraCheckin from "@/components/CameraCheckin";
import Question from "@/utils/Question";
import { useRouter } from "next/navigation";

/**
 * A react component representing the checkin page
 */
export default function Checkin() {
  const router = useRouter();

  // If there is no data, return to step 1
  if (localStorage.getItem("questions") == null) {
    return router.replace("/homepage");
  }

  // Loading the questions information from the local storage
  const questions = JSON.parse(localStorage.getItem("questions")).map(
    (val) => new Question(val)
  );

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

        {/* Camera Button for opening camera and future checkin functions */}
        <div className="flex flex-col px-40">
          <p className="h3 text-center">
            {" "}
            Click on the camera to start recording{" "}
          </p>
          {/* Camera Popup modal */}
          <CameraCheckin questions={questions}></CameraCheckin>
          {/* Manual Form Pop up modal */}
          <ManualForm questions={questions}></ManualForm>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="mx-4 font-bold text-black-200 hidden p-4 w-full">
            Previous
          </Button>
        </div>
      </Card>
    </div>
  );
}
