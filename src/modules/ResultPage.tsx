import { useParams } from "react-router-dom";
import { ChatbotAnalysisResult } from "../components/chatbot/ChatbotAnalysisResult";
import { ChatbotChat } from "../components/chatbot/ChatbotChat";
import { useGetChatbotAnalysisQuery } from "../redux/api/chatbotApi";
import { useGetUserSpecificFilesQuery } from "../redux/api/recordingApi";
import { useGetTaskResultQuery } from "../redux/api/processingApi";

export function ResultPage() {
  const { id } = useParams();
  const { user_id } = useParams();
  const { file_name } = useParams();
  const feedback_id = id;

  var uid = user_id as string
  var filename = file_name as string
  var feed_id = feedback_id as string

  const { data: user_file } = useGetUserSpecificFilesQuery({user_id: uid, file_name: filename})

  const {data: taskResult} = useGetTaskResultQuery(user_file?.task_id ? user_file.task_id : "undefined" )

  const { data: feedback_data, refetch } =
    useGetChatbotAnalysisQuery(feed_id);

  if (user_file == undefined || taskResult?.task_result == null || taskResult?.task_result.srt == null){
    return <div> loading ...</div>
  } else{

    var srtString = taskResult.task_result.srt

    return (
    <div className="flex w-full flex-1 flex-wrap items-stretch justify-center gap-8 px-8 py-2">
      <div className="video w-[600px] bg-slate-200">
        <iframe
          width="600"
          height="350"
          src={user_file.video_link}
          title="Video Example"
        ></iframe>
      </div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-3/4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">SRT Display</h2>
        <textarea
          value={srtString}
          readOnly
          className="w-full h-64 p-2 border border-gray-400 dark:border-gray-500 rounded-lg resize-none dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>
    </div>
      <div className="chatbot mb-4 flex w-[800px] flex-col">
        <ChatbotAnalysisResult result={feedback_data?.analysis} />
        <ChatbotChat
          chat_history={feedback_data?.chat_history}
          feedback_id={feed_id}
          refetch={refetch}
        />
      </div>
    </div>
  );
  }
  
}
