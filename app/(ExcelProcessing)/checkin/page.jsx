'use client';
        
import { StyleProvider } from '@ant-design/cssinjs';
import CameraCheckin from "@/components/CameraCheckin";
import ManualForm from "@/components/ManualForm";
import Question from "@/utils/Question";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function first() {
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
        <StyleProvider hashPriority='high'>
            <div className="flex flex-col gap-3">
                <p className="h3 text-center">
                    Click on the camera to start recording
                </p>
                {/* Camera Popup modal */}
                <CameraCheckin questions={questions}></CameraCheckin>
                {/* Manual Form Pop up modal */}
                <ManualForm questions={questions}></ManualForm>
            </div>
        </StyleProvider>
    )
}

