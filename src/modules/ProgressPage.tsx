import { useParams } from "react-router-dom";
import { useGetTaskResultQuery } from "../redux/api/processingApi";

export function ProgressPage() {
  const { task_id } = useParams();
  const { user_id } = useParams();
  const { file_name } = useParams();

  const { data } = useGetTaskResultQuery(task_id ? task_id : "undefined")
  
  if (data?.task_result == null){
    
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border border-black p-10 w-2/3">
          <h1 className="text-center text-2xl font-semibold mb-4">Your Analysis Result for:</h1>
          <h2 className="text-center text-2xl font-semibold mb-4"> {data?.task_id} </h2>
          <p className={`text-center text-2xl bold text-yellow-500`}>
            On Progress
          </p>
          <p className={`text-center text-2xl text-black-500`}>
            Analysis in progress ...
          </p>
        </div>
      </div>
    );
  }
  else if (data.task_result.error == undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border border-black p-10 w-2/3">
          <h1 className="text-center font-semibold text-2xl mb-4">Your Analysis Result for:</h1>
          <h2 className="text-center font-semibold text-2xl mb-4"> {data?.task_id} </h2>
          <p className={`text-center text-2xl bold text-green-500`}>
            Success
          </p>
          <a href={`/result/${data.task_result.feedback_id}/${user_id}/${file_name}`} className="block dark:text-indigo-300">
            <button>Click here to see your analysis result!</button>
          </a>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border border-black p-10 w-2/3">
          <h1 className="text-center text-2xl font-semibold mb-4">Your Analysis Result for:</h1>
          <h2 className="text-center text-2xl font-semibold mb-4"> {data?.task_id} </h2>
          <p className={`text-center italic text-red-500`}>
            Error
          </p>
          <p>
            There is an error while processing your recording
          </p>
        </div>
      </div>
    );
  }
}
