'use client'
import StepBar from "@/components/StepBar";
import { usePathname } from "next/navigation";

function getIndex(pathname) {
    if (pathname == "/excel") {
      return 0;
    }
    if (pathname == "/setup") {
      return 1;
    }
    if (pathname == "/check-in") {
      return 2;
    }
}

export default function Template({children}) {
    const pathname = usePathname();
    const index = getIndex(pathname);

    return (
        <div className="content -mt-10">
            {/* Title description */}
            <div className=" flex flex-col text-center">
                <h1 className="h1 text-blue-100 font-jomhuria"> Checker </h1>
                <h3 className="h3 mt-2">
                Your check-in setup is{" "}
                <span className="text-blue-100 font-bold">{2 - index}</span> step away
                </h3>
            </div>

            {/* Setup frame */}
            <div className="border rounded-3xl shadow border-gray-300 flex flex-col items-center py-10 mt-8">
                <div className="w-[80%]">
                    
                    {/* Step bar */}
                    <StepBar index={index} />

                    {/* Children page content */}
                    <div className="mt-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}