'use client'
import StepBar from "@/components/StepBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getIndex(pathname) {
    if (pathname == "/excel") {
      return 0;
    }
    if (pathname == "/setup") {
      return 1;
    }
    if (pathname == "/checkin") {
      return 2;
    }
}

export default function Template({children}) {
    const pathname = usePathname();
    const index = getIndex(pathname);

    return (
        <div className="flex flex-row min-h-[70%] content -mt-10 gap-x-10">
            {/* Setup frame */}
            {/* Step bar */}
            <div className="bg-[#000000] xl:basis-3/12 lg:basis-3/12 basis-1/2 border rounded-3xl shadow border-gray-300 flex content-center lg:pt-[3rem] pt-[2rem] lg:px-[2rem] px-[1rem] mt-8">
                <StepBar index={index} />
            </div>
            <div className="bg-[#000000] xl:basis-9/12 lg:basis-8/12 basis-1/2 border rounded-3xl shadow border-gray-300 flex flex-col items-center py-10 px-10 mt-8">
                {/* Children page content */}
                {children}
            </div>
        </div>
    )
}