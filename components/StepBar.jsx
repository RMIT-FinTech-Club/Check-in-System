'use client'
import { Steps, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";


export default function StepBar({ index }) {
  function navigateStep(current) {
    if (current == 0 && index > 0) {
      router.replace("/excel");
    } else if (index > 1 && current == 1) {
      router.replace("/setup");
    }
  }

  const router = useRouter();
  const description = ["Link Excel", "Set-up check-in questions", "Check-in"];

  return (
    <ConfigProvider
      theme={{
        components: {
          steps: {
            finishIconBorderColor: "#1677ff",
          },
        },
        token: {
          colorText: "white",
          colorBorderBg: "white",
          colorTextDescription: "white",
        },
      }}
    >
      <Steps
        direction="vertical"
        current={index}
        onChange={(current) => navigateStep(current)}
        percent={index * 33.3}
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
    </ConfigProvider>
  );
}
