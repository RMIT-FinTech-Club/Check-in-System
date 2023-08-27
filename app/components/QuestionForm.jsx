import Question from "../utils/Question";
import MultipleChoice from "../utils/MultipleChoice";

import {
  Input,
  Card,
  Switch,
  DatePicker,
  Radio,
  Space,
  InputRef,
  Select,
  Button,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
/**
 * A react component to display and edit details of a question
 * @param {Function} changeFocus - a function when call will highlight the current QuestionForm component
 * @param {String} currentFocus - storing the ID of the QuestionForm component that is being highlighted
 * @param {Question} question - store the information of the being displayed question
 * @param {Function} deleteQuestion - a function when call will delete the current QuestionForm component
 */

export default function QuestionForm({
  changeFocus,
  currentFocus,
  question,
  deleteQuestion,
}) {
  // Initalizing all the question types, and map it to the selection box
  const questionTypeList = ["Text", "Date", "sID", "Name", "Multiple choice"];
  const typeSelection = questionTypeList.map((type) => {
    return {
      value: type,
      label: type,
    };
  });

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
    "Multiple choice": (
      <MultipleChoice question={question} edit={currentFocus == question.id} />
    ),
  };
  const inputRef = useRef(null);

  /**
   * Will be called during an onclick event on the current QuestionForm component,
   * which will highlight the component, as well as enabling question editing
   */
  function handleFocus() {
    if (edit == true) return;
    // inputRef.current.focus({ cursor: "end" });
    console.log(inputRef.current);
    inputRef.current.focus();
    changeFocus();
  }

  const [title, setTitle] = useState(question.title);
  const [type, setType] = useState(question.type);
  const [required, setRequired] = useState(question.required);
  // const [choice, setChoice] = useState([]);

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
          {/* {edit ? ( */}
          <Input
            id={"input" + question.id}
            bordered={edit}
            className={`mb-4 mt-0 font-bold w-full ${!edit && "h3"}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              question.title = e.target.value;
            }}
            label={"Question"}
            ref={inputRef}
          ></Input>
          {/* ) : ( */}
          {/* <h3 className={` ${edit && "hidden"}`}>{title}</h3> */}
          {/* )} */}
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
