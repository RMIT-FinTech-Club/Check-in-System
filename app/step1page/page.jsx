import './../css/utility.css';
import './../css/globals.css';

        // Implement a Steps Bar to announce users which steps they are at 
function StepsBar({ index }) {
    const description = ['Link Excel', 'Set up check-in questions', 'Check-in']
    return (
        <Steps
            current={index}
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

            // Main page
export default function StepOnePage() {
    return (
        <div className='mx-10 my-20 flex flex-col max-w-screen max-h-screen'>
            {/* title and notification */}
            <div className="text-center my-2">
                <h1 className="font-jomhuria text-blue-600 p-2 m-0 h1">Checker</h1>
                <h3 className="p-2 m-0 h3 font-inter">Your Check-in setup is <span className="text-blue-600 h3 font-inter">2</span> steps away!</h3>
            </div>
            {/* Dashboard contains an input element to enter Excel link and Link button */}
            <div className="border border-solid border-gray-400 rounded-2xl shadow-md shadow-gray-300 flex flex-col items-center">
            {/* Display Steps imported from antd */}
                <div className='w-3/5 my-10'>
                    <StepsBar/>
                </div>
            {/* Contains a textfield and a "Ready" button to initiate the Link Excel phase */}
                <div className="flex flex-col w-3/5 my-10">
                    <h2 className='text-left p-2 my-2 text-gray-500'>Let's get started</h2>
                    <input type="link" className="p-2 my-1 text-lg border-transparent rounded-lg" placeholder="Your excel link..."/>
                    <button type="submit" className="p-2 my-1 bg-blue-600 text-white rounded-lg border-transparent text-lg curser-pointer">Ready</button>
                </div>
            </div>
        </div>
    )
}