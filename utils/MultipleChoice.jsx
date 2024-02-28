import Question from "./Question";
import { Radio, Input, Button, Space } from "antd";
import { CloseOutlined} from "@ant-design/icons";
import { useState } from "react";

/**
 * A react component for displaying and editing multiple choice question
 * @param {Question} question - The desired question for displaying and editing
 */
export default function MultipleChoice({ question, edit }) {
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
            <div className="flex items-center mb-2">
              <Radio disabled></Radio>
              {edit ? (
                <div className="mr-2">
                  <Input
                    value={value}
                    style={{ width: 250 }}
                    onChange={(e) => updateOption(index, e.target.value)}
                  ></Input>
                  <hr />
                </div>
              ) : (
                <p>{value}</p>
              )}
              {edit && (
                <Button type='text' shape="circle"
                  onClick={() => {
                    removeOption(index);
                  }}
                  icon={<CloseOutlined />}
                >
                </Button>
              )}
            </div>
          );
        })}
        {edit && (
          <div className="flex mb-3">
            <Radio disabled></Radio>
            <Button onClick={addOption}>Add more option</Button>
          </div>
        )}
      </Space>
    </div>
  );
}
