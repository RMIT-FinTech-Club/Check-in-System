import './../css/utility.css';
import './../css/globals.css';
import StepsBar from '../../components/StepsBar';

export default function StepOnePage() {
    return (
        <div className='flex flex-col justify-around h-[calc(100vh-42px)]'>
            {/* title and notification */}
            <div className="text-center">
                <h1 className="font-jomhuria text-blue-600 h1 m-0">Checker</h1>
                <h3 className="p-2 m-0 h3 font-inter">Your Check-in setup is <span className="text-blue-600 h3 font-inter">2</span> steps away!</h3>
            </div>
            {/* Dashboard contains an input element to enter Excel link and Link button */}
            <div className="border border-solid border-gray-400 rounded-2xl shadow-md shadow-gray-300 flex flex-col items-center py-10">
            {/* Display Steps imported from antd */}
                <div className='w-3/5 '>
                    <StepsBar/>
                </div>
            {/* Contains a textfield and a "Ready" button to initiate the Link Excel phase */}
                <div className="flex flex-col w-3/5 my-10">
                    <h2 className='text-left text-gray-500 p-2'>Let's get started</h2>
                    <input type="link" className="text-lg border-transparent rounded-lg p-2 my-2" placeholder="Your excel link..."/>
                    <button type="submit" className=" bg-blue-600 text-white rounded-lg border-transparent text-lg cursor-pointer p-2 my-2">Ready</button>
                </div>
            </div>
        </div>
    )
}