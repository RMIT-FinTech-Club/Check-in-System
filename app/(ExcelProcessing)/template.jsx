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
        <div className="content -mt-10">
            {/* Title description */}
            <div className=" flex flex-col text-center">
                <Link href={'/'}>
                    <h1 className="h1 text-blue-100 font-jomhuria"> Checker </h1>
                </Link>
                <h3 className="h3 mt-2">
                Your check-in setup is{" "}
                <span className="text-blue-100 font-bold"> {(index !== 2) ?? 2 - index} </span> {index !== 2 ? "step(s) away" : "ready"}
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