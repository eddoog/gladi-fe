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
        <div className="flex flex-wrap gap-3 w-full py-5">
          <input
            type="text"
            placeholder="Search"
            className="w-3/4 px-4 rounded-lg"
            value=""
          />
          <button className="rounded-lg flex flex-row items-center gap-2 justify-center bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-500 hover:dark:bg-gray-600 px-4 py-2 w-1/5 duration-200 transition-all ease-in-out">
            <a href="/capture" className="text-white">
              Create Recording
            </a>
          </button>
        </div>

        <div className="flex flex-wrap gap-3 w-full py-5 px-4">
          <div className="w-full">
            <a href="/" className="block dark:text-indigo-300">
              <div className="w-full bg-gray-200 dark:bg-gray-600 border-2 border-gray-400 dark:border-gray-500 p-4 rounded-lg shadow-md mb-4">
                <p>Video 1</p>
                <p>Time: ...</p>
              </div>
            </a>
            <a href="/" className="block dark:text-indigo-300">
              <div className="w-full bg-gray-200 dark:bg-gray-600 border-2 border-gray-400 dark:border-gray-500 p-4 rounded-lg shadow-md mb-4">
                <p>Video 2</p>
                <p>Time: ...</p>
              </div>
            </a>
            <a href="/" className="block dark:text-indigo-300">
              <div className="w-full bg-gray-200 dark:bg-gray-600 border-2 border-gray-400 dark:border-gray-500 p-4 rounded-lg shadow-md mb-4">
                <p>Video 3</p>
                <p>Time: ...</p>
              </div>
            </a>
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
