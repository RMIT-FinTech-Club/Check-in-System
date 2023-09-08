'use client'

import {
  Form,
  Button,
  Input,
  DatePicker,
  Radio,
  message,
  Space,
  Modal,
  Select,
} from "antd";
import Question from "@/utils/Question";
import { validatesID, validatesName } from "@/utils/formValidator";
import { useState } from "react";

/**
 * A component for user to manually fill out form for the checkin process
 */
export default function ManualForm({ questions }) {
  const [form] = Form.useForm(); // Storing the reference to the form
  const [messageApi, contextHolder] = message.useMessage(); // Managing pop up message when submit form

  // Handling when a form is submitted successfully
  const onFinish = (values) => {
    let result = {};

    // Removing id from form input name and return (need updates)
    for (let [key, value] of Object.entries(values)) {
      // console.log(typeof value);
      let mid = key.slice(0, key.length - 2);
      if (!(mid in result)) result[mid] = [];
      if (typeof value == "object") value = value.format("YYYY-MM-DD HH:mm:ss");
      result[mid] = [...result[mid], value];
    }
    console.log("Success:", result);
    form.resetFields();
    messageApi.open({
      type: "success",
      content: "Submitted successfully",
      duration: 1.5,
    });
  };

  // Handling when a form failed to submit
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: "Unable to submit",
    });
  };

  // Handling modal opening and closing
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Mapping each question type into different input field
  const typeMapping = {
    Text: <Input placeholder="Enter your text"></Input>,
    sID: <Input placeholder="Enter your sID"></Input>,
    Name: <Input placeholder="Enter your name"></Input>,
    Date: <DatePicker format={"DD/MM/YYYY"} placement="bottomLeft" />,
  };

  return (
    <>
      {/* Modal for manual input form */}
      <Modal
        open={open}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={"70%"}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <h1 className="h2 text-center"> Manual Input Form </h1>
        {/* Manual Input form component */}

        {/* Pop up message when a form is submit */}
        {contextHolder}

        <Form
          layout="vertical"
          form={form}
          name="manual input"
          labelCol={{
            span: 22,
            offset: 1,
          }}
          wrapperCol={{
            offset: 1,
            span: 22,
          }}
          style={{
            maxWidth: "100%",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Mapping each question into an input field using the question attributes */}
          {questions.map((question) => {
            let title = question.title.slice();
            let choices = Array.from(new Set(question.choice)); // Remove identical options from multiple choice
            // converting array of choices into options for select input
            let selectChoice = choices.map((choice) => {
              return { value: choice, label: choice };
            });
            // selectChoice.push({
            //   value: "",
            //   label: "No options/Empty value",
            // });
            return (
              <Form.Item
                key={question.id}
                label={title.charAt(0).toUpperCase() + title.slice(1)}
                name={`${question.title}-${question.id}`} // Combining name with object id to create unique name for form input
                rules={[
                  {
                    required: question.required,
                    messsage: `Please input your ${title}`,

                    type: question.type == "Date" ? "object" : "string",
                  },
                  // Custome input validator base on different question type
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      switch (question.type) {
                        case "sID":
                          if (validatesID(value)) return Promise.resolve();
                          return Promise.reject(new Error("Invalid sID field"));

                        case "Name":
                          if (validatesName(value)) return Promise.resolve();
                          return Promise.reject(new Error("Invalid name"));

                        default:
                          return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                {/* Rendering the multiple choice input directly due to the need of choice attribute from question */}
                {question.type == "Multiple choice" ? (
                  // <Radio.Group>
                  //   {choices.map((choice) => {
                  //     return <Radio value={choice}>{choice}</Radio>;
                  //   })}
                  // </Radio.Group>
                  <Select
                    placeholder="Enter your option"
                    style={{ width: 500 }}
                    options={selectChoice}
                    allowClear={true}
                  />
                ) : (
                  // If not multiple choice question, then using the typeMapping to map to the corresponding question type
                  typeMapping[question.type]
                )}
              </Form.Item>
            );
          })}

      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
        </Form>
      </Modal>
      {/* Manual Input Button */}
      <Button size="large" className="w-full" onClick={showModal}>
        Manual Input
      </Button>
    </>
  );
}
