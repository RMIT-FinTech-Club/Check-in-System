"use client";

import { InputNumber, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Question from "@/utils/Question";
import QuestionForm from "@/components/QuestionForm";
import axios from "axios";

/**
 * A react component represent the whole setup page
 */
export default function Setup() {
  const [headers, setHeaders] = useState(null);

  const [fileName, setFileName] = useState(null);
  
  const [headerPosition, setHeaderPosition] = useState("A1");

  // Storing information of all the questions during setup
  const [questions, setQuestions] = useState([
    new Question({ title: "Your Name", id: "0", type: "Name" }),
    new Question({ title: "Your sID", id: "1", type: "sID" }),
  ]);

  const [currentFocus, setCurrentFocus] = useState(null);
  const router = useRouter();

  getFileName()

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
    router.replace("/checkin");
  }

  async function queryHeaders() {
    try {
        const response = await axios.post('localhost:3000/api/excel/query-headers', {
          header_position : headerPosition
        });
        const headers = response.data.headers;
        const queryQuestions = headers.map((header, index) => {
          return new Question({ title: header, id: index.toString() })
        });

        setQuestions(queryQuestions);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
  }

  async function getFileName() {
    try {
        const response = await axios.post('/api/excel/get-file-name', {});
        setFileName(response.data.fileName)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
  }

  return (
    <div>
      <div className="flex justify-between align-middle items-center h3 mb-4">
          <h2 className="text-blue-100">{fileName}</h2> 
          <div className="flex justify-center items-center gap-3">
            <label>Select headers input</label>
            <input className="p-1 text-sm font-normal border border-gray-300 rounded-md"
              type="text" placeholder="Header position"
              onChange={e => setHeaderPosition(e.target.value)} />
            <Button onClick={queryHeaders}>Confirm</Button>
          </div>
        </div>

        {/* Mapping each question into QuestionForm component */}
        {questions.map((value, index) => {
          return (
              <QuestionForm
                changeFocus={() => {
                  updateFocus(value.id);
                }}
                currentFocus={currentFocus}
                key={value.id + value.title} // Add key prop that changes when title changes
                question={value}
                deleteQuestion={() => {
                  deleteQuestion(value.id);
                }}
              ></QuestionForm>
          );
        })}
        <div className="flex justify-end mt-4 gap-3">
          <Tooltip title="Add question">
            <Button type="primary" icon={<PlusOutlined />} onClick={addQuestion}>
            </Button>
          </Tooltip>
          <Button>Previous</Button>
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
    </div>
  );
}
