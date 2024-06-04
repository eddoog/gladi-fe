import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery } from '../redux/api/authAPi';
import { useGetUserRecordingQuery } from '../redux/api/recordingApi';

export function RecordingListPage() {
  const navigate = useNavigate();

  const { data: user } = useGetUserInfoQuery();

  // Supaya klo user id null gak ngaco
  const { data: recordingData } = useGetUserRecordingQuery(
    user?.id ? user.id : 'bad_request'
  );

  const handleBack = () => {
    navigate('/');
  };

  if (user?.id == undefined || recordingData?.length == 0) {
    return (
      <div>
        <div className="flex w-full flex-wrap gap-3 py-10">
          <h2 className="w-full text-center text-3xl font-bold md:text-5xl">
            Your Recordings
          </h2>
          <div className="flex w-full flex-wrap gap-3 py-5">
            <button className="flex w-1/5 flex-row items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600">
              <a href="/capture" className="text-white">
                Create Recording
              </a>
            </button>
          </div>

          <div className="flex w-full flex-wrap gap-3 px-4 py-5">
            <div className="w-full">
              <h2 className="text-center font-bold">
                You haven't had any recording yet.
              </h2>
            </div>
          </div>
          <button
            onClick={handleBack}
            className="flex flex-row items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600"
          >
            Back
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex w-full flex-wrap gap-3 py-10">
          <h2 className="w-full text-center text-3xl font-bold md:text-5xl">
            Your Recordings
          </h2>
          <div className="flex w-full flex-wrap gap-3 py-5">
            <button className="flex w-1/5 flex-row items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600">
              <a href="/capture" className="text-white">
                Create Recording
              </a>
            </button>
          </div>

          <div className="flex w-full flex-wrap gap-3 px-4 py-5">
            <div className="w-full">
              {recordingData?.map((recording) => (
                <a
                  href={`/progress/${recording.task_id}/${recording.user_id}/${recording.file_name}`}
                  className="block dark:text-indigo-300"
                  key={recording.id}
                >
                  <div className="mb-4 flex w-full flex-col justify-center rounded-lg border-2 border-gray-400 bg-gray-200 p-4 shadow-md dark:border-gray-500 dark:bg-gray-600">
                    <p>File name: {recording.file_name}</p>
                    <p>Task id: {recording.task_id}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <button
            onClick={handleBack}
            className="flex flex-row items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600"
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}
