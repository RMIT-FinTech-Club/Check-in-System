'use client'
import { Steps } from "antd";
import { usePathname } from "next/navigation";

function navigateStep(current, index) {
  if (current == 0) {
    window.location.href = "/excel";
  } else if (index > 1 && current == 1) {
    window.location.href = "/setup";
  } 
}

export default function StepBar({index}) {
  const description = ["Link Excel", "Set-up check-in questions", "Check-in"];
  
  return (
    <Steps
      current={index}
      onChange={(current, index) => navigateStep(current, index)}
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
