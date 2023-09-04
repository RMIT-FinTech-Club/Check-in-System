import Question from "@/utils/Question";
import MultipleChoice from "@/utils/MultipleChoice";

import {
  Input,
  Switch,
  DatePicker,
  Select,
  Button
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
  const questionTypeList = ["sID", "Name", "Text", "Date", "Multiple choice"];
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
    sID: <Input placeholder="Enter your sID" bordered={false} disabled></Input>,
    Name: (
      <Input placeholder="Enter your name" bordered={false} disabled></Input>
    ),
    Date: <DatePicker bordered={false} />,
    "Multiple choice": (
      <div className='ml-2'>
        <MultipleChoice question={question} edit={currentFocus == question.id} />
      </div>
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
    // console.log(inputRef.current);
    changeFocus();
  }

  const [title, setTitle] = useState(question.title);
  const [type, setType] = useState(question.type);
  const [required, setRequired] = useState(question.required);
  // const [choice, setChoice] = useState([]);

  // Checking whether the currentFocus is the ID of the current focus, if true then highlight and enable editing
  let edit = currentFocus == question.id;

  return (
    <div
      className={`border rounded-lg border-gray-300 shadow p-6 mb-4 ${
        edit && "border-l-8 border-l-blue-100"
      }`}
      onClick={handleFocus}
    >
      {/* Questions that are being edited */}
      <div className="flex gap-8">
        <div className="grow">
          {/* {edit ? ( */}
          <Input
            id={"input" + question.id}
            // bordered={false}
            className={`${!edit && "hidden"}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              question.title = e.target.value;
            }}
            label={"Question"}
            ref={inputRef}
          ></Input>
          <br />

          {/* Mapping the type of question to the suitable answering box */}
          <div className="mt-3 -ml-2">
            {typeMapping[type]}
          </div>
        </div>
        {/* Selection box for choosing question type */}
        <div className="grow-0">
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
          <hr className="mt-1 mb-3" />
          <div className="flex justify-end items-center gap-3 text-black-200">
            <Button type='text' shape="circle" onClick={deleteQuestion} icon={<DeleteOutlined />}>
            </Button>
            <div>
              <label className="mr-2">Required</label>
              <Switch
                checked={required}
                size="small"
                onClick={(e) => {
                  question.required = e;
                  setRequired((required) => !required);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
