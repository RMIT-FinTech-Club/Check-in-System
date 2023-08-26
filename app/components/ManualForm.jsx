import { Form, Button, Input, DatePicker, Radio, message } from "antd";
import Question from "../utils/Question";
import { validatesID, validatesName } from "../utils/formValidator";

/**
 * A component for user to manually fill out form for the checkin process
 */
export default function ManualForm({ questions }) {
  const [form] = Form.useForm(); // Storing the reference to the form
  const [messageApi, contextHolder] = message.useMessage(); // Managing pop up message when submit form

  // Handling when a form is submitted successfully
  const onFinish = (values) => {
    console.log("Success:", values);
    form.resetFields();
    messageApi.open({
      type: "success",
      content: "Submitted successfully",
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

  // Mapping each question type into different input field
  const typeMapping = {
    Text: <Input placeholder="Enter your text"></Input>,
    sID: <Input placeholder="Enter your sID"></Input>,
    Name: <Input placeholder="Enter your name"></Input>,
    Date: <DatePicker format={"DD/MM/YYYY"} />,
  };

  return (
    <>
      {/* Pop up message when a form is submit */}
      {contextHolder}

      <Form
        form={form}
        name="manual input"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
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
          let title = question.title;
          let choices = question.choice;
          return (
            <Form.Item
              label={title.charAt(0).toUpperCase() + title.slice(1)}
              name={title}
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
                <Radio.Group>
                  {choices.map((choice) => {
                    return <Radio value={choice}>{choice}</Radio>;
                  })}
                </Radio.Group>
              ) : (
                // If not multiple choice question, then using the typeMapping to map to the corresponding question type
                typeMapping[question.type]
              )}
            </Form.Item>
          );
        })}

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
