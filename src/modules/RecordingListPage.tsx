import { useNavigate } from "react-router-dom";

export function RecordingListPage() {
    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate("/");
      };
    
    return (
        <div> 
            <div className="flex flex-wrap gap-3 w-full py-10">
                <h2 className="text-3xl md:text-5xl text-center w-full font-bold">
                    Your Recordings
                </h2>
                <div className="flex flex-wrap gap-3 w-full py-10">
                    <div className="w-full">
                        <a href="" className="block">
                            <div className="w-full bg-gray-200 p-4 rounded-lg shadow-md mb-4">
                                <p>Video 1</p>
                                <p>Time: ...</p>
                            </div>
                        </a>
                        <a href="" className="block">
                            <div className="w-full bg-gray-200 p-4 rounded-lg shadow-md mb-4">
                                <p>Video 2</p>
                                <p>Time: ...</p>
                            </div>
                        </a>
                        <a href="" className="block">
                            <div className="w-full bg-gray-200 p-4 rounded-lg shadow-md mb-4">
                                <p>Video 3</p>
                                <p>Time: ...</p>
                            </div>
                        </a>
                    </div>
                </div>
                <button 
                    onClick={handleBack} 
                    className="rounded-2xl flex flex-row items-center gap-2 justify-center hover:text-blue-300"
                >
                    Back
                </button>
            </div> 
            
        </div>
    )
}