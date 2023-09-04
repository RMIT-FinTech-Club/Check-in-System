import { Steps } from "antd";

export default function StepBar({ index }) {
  const description = ["Link Excel", "Set-up check-in questions", "Check-in"];
  return (
    <Steps
      current={index - 1}
      items={[
        {
          title: "Finished",
          description: description[0],
        },
        {
          title: "In Progress",
          description: description[1],
        },
        {
          title: "Waiting",
          description: description[2],
        },
      ]}
    />
  );
}
