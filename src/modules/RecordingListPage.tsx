import { useNavigate } from "react-router-dom";
import { useGetUserInfoQuery } from "../redux/api/authAPi";
import { useGetUserRecordingQuery } from "../redux/api/recordingApi";

export function RecordingListPage() {
  const navigate = useNavigate();

  const { data: user } = useGetUserInfoQuery();

  // Supaya klo user id null gak ngaco 
  const {data: recordingData} = useGetUserRecordingQuery(user?.id ? user.id : "bad_request")
  const handleBack = () => {
    navigate("/");
  };

  if (user?.id || recordingData?.length == 0){
      return (
        <div>
          <div className="flex flex-wrap gap-3 w-full py-10">
            <h2 className="text-3xl md:text-5xl text-center w-full font-bold">
              Your Recordings
            </h2>
            <div className="flex flex-wrap gap-3 w-full py-5">
              <button className="rounded-lg flex flex-row items-center gap-2 justify-center bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600 px-4 py-2 w-1/5 duration-200 transition-all ease-in-out">
                <a href="/capture" className="text-white">
                  Create Recording
                </a>
              </button>
            </div>
  
            <div className="flex flex-wrap gap-3 w-full py-5 px-4">
              <div className="w-full">
                <h2 className="text-center font-bold">You haven't had any recording yet.</h2>
              </div>
            </div>
            <button
              onClick={handleBack}
              className="rounded-lg flex flex-row items-center gap-2 justify-center bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600 duration-200 transition-all ease-in-out px-4 py-2"
            >
              Back
            </button>
          </div>
        </div>
      );
    }
    else {
      return (
    <div>
      <div className="flex flex-wrap gap-3 w-full py-10">
        <h2 className="text-3xl md:text-5xl text-center w-full font-bold">
          Your Recordings
        </h2>
        <div className="flex flex-wrap gap-3 w-full py-5">
          <button className="rounded-lg flex flex-row items-center gap-2 justify-center bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600 px-4 py-2 w-1/5 duration-200 transition-all ease-in-out">
            <a href="/capture" className="text-white">
              Create Recording
            </a>
          </button>
        </div>

        <div className="flex flex-wrap gap-3 w-full py-5 px-4">
          <div className="w-full">
            {
              recordingData?.map((recording) => (
                <a href="/" className="block dark:text-indigo-300" key={recording.id}>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 border-2 border-gray-400 dark:border-gray-500 p-4 rounded-lg shadow-md mb-4">
                    <p>{recording.file_name}</p>
                  </div>
                </a>
              ))
            }
          </div>
        </div>
        <button
          onClick={handleBack}
          className="rounded-lg flex flex-row items-center gap-2 justify-center bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600 duration-200 transition-all ease-in-out px-4 py-2"
        >
          Back
        </button>
      </div>
    </div>
  )
    }
} 