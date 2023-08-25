"use client";

import { InputNumber, Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import StepBar from "../components/StepBar";
import { useRouter } from "next/navigation";
import Question from "../utils/Question";
import QuestionForm from "../components/QuestionForm";

/**
 * A react component represent the whole setup page
 */
export default function Setup() {
  // Storing information of all the questions during setup
  const [questions, setQuestions] = useState([
    new Question({ title: "Your name", id: "0" }),
    new Question({ title: "Your style", id: "1" }),
  ]);

  const [currentFocus, setCurrentFocus] = useState("-1");
  const router = useRouter();

  /**
   * A function to delete a question base on its id
   * @param {String} id - The id of the wanted question
   */
  function deleteQuestion(id) {
    let index = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === id) {
        index = i;
        break;
      }
    }
    questions.splice(index, 1);
    setQuestions([...questions]);
  }
  /**
   * A function to add question with default values
   */
  function addQuestion() {
    let last = questions[questions.length - 1];
    let mid = new Question({
      title: "Your question",
      id: (parseInt(last.id) + 1).toString(),
    });
    setQuestions((questions) => [...questions, mid]);
  }
  /**
   * Updating the currentFocus to store the ID of the question
   * @param {String} id - ID of the question that needs to be highlight and editable
   */
  function updateFocus(id) {
    setCurrentFocus(id);
  }

  /**
   * A function to store questions information and move to the next step
   */
  function finishStep(router) {
    localStorage.setItem("questions", JSON.stringify(questions));
    router.push("/excel/checkin");
  }

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
        <h3 className="h3 mt-0">
          Your check-in setup is{" "}
          <span className="text-blue-100 bg-white">1</span> step away
        </h3>
      </div>

      <Card className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <StepBar index={2}></StepBar>
        <div className="flex justify-between align-middle items-center">
          <h2 className="text-blue-100">Clud Day Participants</h2>
          <div className="flex justify-center items-center">
            <p className="font-bold mx-4">Select headers input</p>
            <InputNumber min={1} max={100} defaultValue={3} />
          </div>
        </div>
        {/* Mapping each question into QuestionForm component */}
        {questions.map((value, index) => {
          return (
            <>
              <QuestionForm
                changeFocus={() => {
                  updateFocus(value.id);
                }}
                currentFocus={currentFocus}
                key={value.id}
                question={value}
                deleteQuestion={() => {
                  deleteQuestion(value.id);
                }}
              ></QuestionForm>
              <br></br>
            </>
          );
        })}
        <div className="flex justify-end mt-4">
          <Button type="primary" onClick={addQuestion}>
            <PlusOutlined />
          </Button>
          <Button className="mx-4 font-bold text-black-200">Previous</Button>
          <Button
            type="primary"
            className="font-bold"
            onClick={() => {
              finishStep(router);
            }}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
