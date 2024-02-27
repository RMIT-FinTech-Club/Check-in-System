'use client';
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
    notification,
} from "antd";
import '@/css/globals.css';
import { StyleProvider } from '@ant-design/cssinjs';
import CameraCheckin from "@/components/CameraCheckin";
import ManualForm from "@/components/ManualForm";
import Question from "@/utils/Question";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function first({scannedData, params}) {
    function typeMapping({ question, options, value }) {
        switch (question) {
            case "Text":
                return <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: "#181818",
                            colorTextPlaceholder: "#ffffff",
                            fontSize: 14,
                            lineHeight: 2,
                        },
                    }}
                >
                    <Input placeholder="Enter your text" />
                </ConfigProvider>;
            case "sID":
                return <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: "#181818",
                            colorTextPlaceholder: "#ffffff",
                            fontSize: 14,
                            lineHeight: 2,
                        },
                    }}
                ><Input placeholder="Enter your sID" />
                </ConfigProvider>;
            case "Name":
                return <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: "#181818",
                            colorTextPlaceholder: "#ffffff",
                            fontSize: 14,
                            lineHeight: 2,
                        },
                    }}
                ><Input placeholder="Enter your name" />
                </ConfigProvider>;
            case "Date":
                return <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: "#181818",
                            colorTextPlaceholder: "#ffffff",
                            fontSize: 14,
                            lineHeight: 2,
                        },
                    }}
                >
                    <DatePicker format={"DD/MM/YYYY"} placement="bottomLeft" />
                </ConfigProvider>;
            case "Multiple choice":
                return <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: "#181818",
                            colorTextPlaceholder: "#ffffff",
                            fontSize: 14,
                            lineHeight: 2,
                        },
                    }}
                >
                    <Select
                        placeholder="Enter your option"
                        options={options}
                        allowClear={true}
                    />
                </ConfigProvider>;
            default:
                return <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: "#181818",
                            colorTextPlaceholder: "#ffffff",
                            fontSize: 14,
                            lineHeight: 2,
                        },
                    }}
                >
                    <Input placeholder="Enter your text" />
                </ConfigProvider>;
        }
    }
    const [form] = Form.useForm(); // Storing the reference to the form

    async function submitDataToRow(result) {
        try {
            const response = await axios.post('/api/excel/add-data-to-new-row', {
                data: result
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    // Handling when a form is submitted successfully
    const onFinish = async (values) => {

        // Removing id from form input name and return (need updates)
        for (let [key, value] of Object.entries(values)) {
            if (typeof value == "object") value = value.format("DD/MM/YYYY");
            if (typeof value == "string") value = value.trim();
        }

        await submitDataToRow(Object.values(values));
        form.resetFields();
        cancelFunc();
        handleCancel();
        notifySuccess();
    };

    // Handling when a form failed to submit
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        notifyError();
    };

    const fillData = () => {
        if (scannedData) {
            form.setFieldsValue({
                sID: `s${scannedData.ID}`,
                Name: scannedData.Name,
            });
        }
    }
    fillData();
    const router = useRouter();

    // If there is no data, return to step 1
    // if (localStorage.getItem("questions") == null) {
    //     return router.replace("/homepage");
    // }

    // Loading the questions information from the local storage
    const [questions, setQuestions] = useState([]);
    async function getQuestions(id) {
        try {
            const response = await axios.get(`/api/excelData/r/${id}`);
            console.log(response.data.questions);
            setQuestions(response.data.questions);
        } catch (error) {
            console.error('Error fetching redis data:', error)
        }
    }

    useEffect(() => {
        getQuestions(params.id);
    }, []);

    return (
        <StyleProvider hashPriority='high'>
            <div className="min-h-[100%] min-w-[100%] flex flex-col justify-center">
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: "#ffffff",
                            fontSize: 20,
                        },
                    }}
                >
                    <Form
                        className="bold-labels flex flex-col gap-4"
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
                            return (
                                <Form.Item
                                    key={question.id}
                                    label={title.charAt(0).toUpperCase() + title.slice(1)}
                                    name={(question.type == 'sID' || question.type == 'Name') ? question.type : `${question.title}`} // Combining name with object id to create unique name for form input
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
                                    {typeMapping({ question: question.type, options: selectChoice, value: question.value })}
                                </Form.Item>
                            );
                        })}
                        <Form.Item>
                            <div className="flex justify-end gap-4">
                                {/* Camera Popup modal */}
                                <CameraCheckin questions={questions}></CameraCheckin>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorBgContainer: "#ffffff",
                                            colorText: "#000000",
                                            fontSize: 14,
                                        },
                                    }}
                                >
                                    <Button type="default" htmlType="submit" className="min-h-[40px]">
                                        Upload
                                    </Button>
                                </ConfigProvider>
                            </div>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
        </StyleProvider>
    )
}

