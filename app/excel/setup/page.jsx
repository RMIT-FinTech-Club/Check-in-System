"use client";

import {
  InputNumber,
  Button,
  Card,
  Switch,
  Select,
  Input,
  DatePicker,
  Radio,
  Space,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import { Input } from "@mui/material";
import { useState, useRef } from "react";
import StepBar from "../../../components/StepBar";

// Initalizing all the question types, and map it to the selection box
const questionTypeList = ["Text", "Date", "sID", "Name", "Multiple choice"];
const typeSelection = questionTypeList.map((type) => {
  return {
    value: type,
    label: type,
  };
});

/**
 * A class for storing information of a question object
 * @param {String} title - The title/header of the question
 * @param {String} type - The type of the question, includinng text, date, or multiple choice
 * @param {Boolean} required - Whether this question must be answer or not
 * @param {Array} choice - List of choices for a multiple choice question
 * @param {String} id - ID/key of the question
 */
class Question {
  constructor(title, id) {
    this.title = title;
    this.type = "Text";
    this.required = false;
    this.choice = [];
    this.id = id;
  }
}

/**
 * A react component for displaying and editing multiple choice question
 * @param {Question} question - The desired question for displaying and editing
 */

function MultipleChoice({ question }) {
  // Storing and manipulating all of the current question's choice
  const [options, setOptions] = useState(question.choice);

  // Adding new option to the question
  function addOption() {
    let mid = [...options];
    mid.push("Enter option name");
    setOptions(mid);
    question.choice = mid;
  }

  /**
   * Updating the value of the selected option
   * @param {Integer} index - the index of the option in the choice array from question object
   * @param {String} val - the updated value of the question
   */
  function updateOption(index, val) {
    options[index] = val;
    setOptions([...options]);
    question.choice = options;
  }

  /**
   * Removing an option from the question using the option index
   * @param {Integer} index - the index of the selected option
   */
  function removeOption(index) {
    let mid = [...options];
    mid.splice(index, 1);
    setOptions(mid);
    question.choice = mid;
  }

  return (
    <div className="flex">
      <Space direction="vertical">
        {/* Mapping each option into sub components that allow for editing and deleting that option */}
        {options.map((value, index) => {
          return (
            <div className="flex items-center">
              <Radio disabled></Radio>
              <Input
                value={value}
                bordered={false}
                onChange={(e) => updateOption(index, e.target.value)}
              ></Input>
              <Button
                onClick={() => {
                  removeOption(index);
                }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          );
        })}

        <div className="flex">
          <Radio disabled></Radio>
          <Button onClick={addOption}>Add more option</Button>
        </div>
      </Space>
    </div>
  );
}

/**
 * A react component to display and edit details of a question
 * @param {Function} changeFocus - a function when call will highlight the current QuestionForm component
 * @param {String} currentFocus - storing the ID of the QuestionForm component that is being highlighted
 * @param {Question} question - store the information of the being displayed question
 * @param {Function} deleteQuestion - a function when call will delete the current QuestionForm component
 */

function QuestionForm({ changeFocus, currentFocus, question, deleteQuestion }) {
  // Mapping each question type into suitable component for displaying
  const typeMapping = {
    Text: (
      <Input placeholder="Text paragraph" bordered={false} disabled></Input>
    ),
    sID: <Input placeholder="Enter your sid" bordered={false} disabled></Input>,
    Name: (
      <Input placeholder="Enter your name" bordered={false} disabled></Input>
    ),
    Date: <DatePicker className="pb-0" disabled />,
    "Multiple choice": <MultipleChoice question={question} />,
  };
  // const inputRef = useRef(null);

  /**
   * Will be called during an onclick event on the current QuestionForm component,
   * which will highlight the component, as well as enabling question editing
   */
  function handleFocus() {
    if (edit == true) return;
    changeFocus();
  }

  const [title, setTitle] = useState(question.title);
  const [type, setType] = useState(question.type);
  const [required, setRequired] = useState(question.required);
  const [choice, setChoice] = useState([]);

  // Checking whether the currentFocus is the ID of the current focus, if true then highlight and enable editing
  let edit = currentFocus == question.id;
  return (
    <Card
      className={`shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${
        edit && "border-l-8 border-l-blue-100"
      }`}
      onClick={handleFocus}
    >
      {/* Questions that are being edited */}
      <div className="flex">
        <div className=" grow  mr-8 ">
          {edit ? (
            <Input
              bordered={false}
              className=" mb-4 mt-0 font-bold w-full "
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                question.title = e.target.value;
              }}
              label={"Question"}
            ></Input>
          ) : (
            <h3>{title}</h3>
          )}
          <br />
          {/* Mapping the type of question to the suitable answering box */}
          {typeMapping[type]}
        </div>
        {/* Selection box for choosing question type */}
        <div className=" grow-0">
          {edit && (
            <Select
              size="middle"
              options={typeSelection}
              value={type}
              style={{ width: "200px" }}
              onChange={(val) => {
                setType(val);
                question.type = val;
              }}
            ></Select>
          )}
        </div>
      </div>
      {edit && (
        <>
          <hr className=" mt-4" />
          <div className="flex justify-end items-center">
            <Button type="text" onClick={deleteQuestion}>
              <DeleteOutlined />
            </Button>
            <p className=" text-black-200 mr-2">Required</p>
            <Switch
              checked={required}
              size="small"
              onClick={(e) => {
                question.required = e;
                setRequired((required) => !required);
              }}
            />
          </div>
        </>
      )}
    </Card>
  );
}

/**
 * A react component represent the whole setup page
 */
export default function Setup() {
  // Storing information of all the questions during setup
  const [questions, setQuestions] = useState([
    new Question("Your name", "0"),
    new Question("Your style", "1"),
  ]);
  const [currentFocus, setCurrentFocus] = useState("-1");
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
    let mid = new Question("Your question", (parseInt(last.id) + 1).toString());
    setQuestions((questions) => [...questions, mid]);
  }
  /**
   * Updating the currentFocus to store the ID of the question
   * @param {String} id - ID of the question that needs to be highlight and editable
   */
  function updateFocus(id) {
    setCurrentFocus(id);
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
          <Button type="primary" className="font-bold">
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
