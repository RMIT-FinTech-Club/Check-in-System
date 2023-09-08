'use client'
import { Steps } from "antd";
import { useRouter } from "next/navigation";


export default function StepBar({index}) {
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
    <Steps
      current={index}
      onChange={(current) => navigateStep(current)}
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
