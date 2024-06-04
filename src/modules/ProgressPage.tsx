import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetTaskResultQuery } from '../redux/api/processingApi';

export function ProgressPage() {
  const { task_id } = useParams();
  const { user_id } = useParams();
  const { file_name } = useParams();
  const success = 'SUCCESS';

  const { data, refetch } = useGetTaskResultQuery(
    task_id ? task_id : 'undefined'
  );

  useEffect(() => {
    if (data?.task_status != success) {
      const interval = setInterval(() => {
        refetch();
      }, 1500); // Adjust the interval time as needed (e.g., 5000ms for 5 seconds)

      return () => clearInterval(interval); // Clear the interval on component unmount
    }
  }, [data, refetch]);

  if (data?.task_result == null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-2/3 border border-black p-10 rounded-xl">
          <h1 className="mb-4 text-center text-2xl font-semibold">
            Your Analysis Result for:
          </h1>
          <h2 className="mb-4 text-center text-2xl font-semibold">
            {' '}
            {data?.task_id}{' '}
          </h2>
          <p className={`bold text-center text-2xl text-yellow-500`}>
            On Progress
          </p>
          <p className={`text-black-500 text-center text-2xl`}>
            Analysis in progress ...
          </p>
        </div>
      </div>
    );
  } else if (data.task_result.error == undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-2/3 border border-black p-10 rounded-xl">
          <h1 className="mb-4 text-center text-2xl font-semibold">
            Your Analysis Result for:
          </h1>
          <h2 className="mb-4 text-center text-2xl font-semibold">
            {' '}
            {data?.task_id}{' '}
          </h2>
          <p className={`bold text-center text-2xl text-green-500`}>Success</p>
          <a
            href={`/result/${data.task_result.feedback_id}/${user_id}/${file_name}`}
            className="block dark:text-indigo-300"
          >
            <button>Click here to see your analysis result!</button>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-2/3 border border-black p-10 rounded-xl">
          <h1 className="mb-4 text-center text-2xl font-semibold">
            Your Analysis Result for:
          </h1>
          <h2 className="mb-4 text-center text-2xl font-semibold">
            {' '}
            {data?.task_id}{' '}
          </h2>
          <p className={`text-center italic text-red-500`}>Error</p>
          <p>There is an error while processing your recording</p>
        </div>
      </div>
    );
  }
}
