import { metadata } from "./layout";
import LoadingForm from "@/components/LoadingForm";

export default function Home() {
  
  return (
    // Name of the application
    <div className="content text-center">
      <h1 className="text-blue-100 h1">{metadata.description}</h1>
      <h3 className="p mt-5 mb-10">{metadata.label}</h3>

      {/* Input link and Link button*/}
      <LoadingForm />

      <div className="mt-12">
        <img src="./../homepage.svg" alt="Checkin and Excel automation" />
      </div>
      {/* Description image */}
    </div>
  )
}
