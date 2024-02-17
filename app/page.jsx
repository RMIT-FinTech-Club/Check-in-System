import { metadata } from "./layout";
import LoadingForm from "@/components/LoadingForm";

export default function Home() {
  
  return (
    // Name of the application
    <div className="content text-center">
      <h1 className="text-white-100 h1">
        <div>Streamlined Student</div>
        <div>Check-in Solution</div>
      </h1>
      <h3 className="text-white-100 p mt-5 mb-10">{metadata.label}</h3>

      {/* Input link and Link button*/}
      <LoadingForm />

      <div className="mt-12">
        <img src="./../homepage.svg" alt="Checkin and Excel automation" />
      </div>
      <img src="/curve.svg" alt="Background Decoration" className='bg-decoration' />
      {/* Description image */}
    </div>
  )
}
