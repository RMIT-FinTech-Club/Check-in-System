import { Steps } from "antd";

export default function StepsBar({ index }) {
    const description = ['Link Excel', 'Set up check-in questions', 'Check-in']
    return (
        <Steps
            current={0}
            items={[
                {
                    title: "In Progress",
                    description: description[0],
                },
                {
                    title: "Waiting",
                    description: description[1],
                },
                {
                    title: "Waiting",
                    description: description[2],
                }
            ]}
        />
    )
}