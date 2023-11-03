"use client";

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
  ConfigProvider,
} from "antd";
import Question from "@/utils/Question";
import validateUtils from "@/utils/formValidator";
import { useState } from "react";

/**
 * A component for user to manually fill out form for the checkin process
 */

export default function ManualForm({ questions, isOpen, scannedData, cancelFunc}) {
  function typeMapping({question, options, value}) {
    switch (question) {
      case "Text":
        return <Input placeholder="Enter your text"/>;
      case "sID":
        return <Input placeholder="Enter your sID" defaultValue={scannedData && scannedData.ID}/>;
      case "Name":
        return <Input placeholder="Enter your name" defaultValue={scannedData && scannedData.Name}/>;
      case "Date":
        return <DatePicker format={"DD/MM/YYYY"} placement="bottomLeft" />;
      case "Multiple choice":
        return 
        <Select
          placeholder="Enter your option"
          style={{ width: 500 }}
          options={options}
          allowClear={true}
        />;
      default:
        return <Input placeholder="Enter your text"/>;
    }
  }
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
      if (typeof value == "object") value = value.format("DD/MM/YYYY");
      if (typeof value == "string") value = value.trim();
      result[mid] = [...result[mid], value];
    }
    console.log("Success:", result);
    form.resetFields();
    messageApi.open({
      type: "success",
      content: "Update successfully",
      duration: 1.5,
    });
  };

  // Handling when a form failed to submit
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: "Unable to update",
    });
  };

  // Handling modal opening and closing
  const [open, setOpen] = useState(isOpen);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadiusLG: "0px",
          },
          Modal: {
            contentBg: "#ffffff",
          },
        },
      }}
    >
      {/* Modal for manual input form */}
      <Modal
        open={open}
        // onOk={handleOk}
        onCancel={() => {
          handleCancel();
          cancelFunc();
        }}
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
          // action={}
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
                      // If the question is not required the the input value is empty then validates as true
                      if (
                        !question.required &&
                        (question.type === "sID" ||
                          question.type === "Name" ||
                          question.type === "Text")
                      ) {
                        if (value === undefined) return Promise.resolve();
                        if (value.trim() === "") return Promise.resolve();
                      }
                      switch (question.type) {
                        case "sID":
                          if (validateUtils.validatesID(value))
                            return Promise.resolve();
                          return Promise.reject(new Error("Invalid sID field"));

                        case "Name":
                          if (validateUtils.validatesName(value))
                            return Promise.resolve();
                          return Promise.reject(new Error("Invalid name"));

                        case "Text":
                          if (validateUtils.validatesText(value))
                            return Promise.resolve();
                          return Promise.reject(new Error("Invalid text"));

                        default:
                          return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                {/* Rendering the multiple choice input directly due to the need of choice attribute from question */}
                {typeMapping({question: question.type, options: selectChoice, value: question.value})}
              </Form.Item>
            );
          })}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Manual Input Button */}
      <Button
        size="large"
        className="w-full"
        type="default"
        onClick={showModal}
      >
        Manual Input
      </Button>
    </ConfigProvider>
  );
}
