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

  const uid = user_id as string;
  const filename = file_name as string;
  const feed_id = feedback_id as string;

  const { data: user_file } = useGetUserSpecificFilesQuery({
    user_id: uid,
    file_name: filename,
  });

  const { data: taskResult } = useGetTaskResultQuery(
    user_file?.task_id ? user_file.task_id : "undefined",
  );

  const { data: feedback_data, refetch } = useGetChatbotAnalysisQuery(feed_id);

  if (
    user_file == undefined ||
    taskResult?.task_result == null ||
    taskResult?.task_result.srt == null
  ) {
    return <div> loading ...</div>;
  } else {
    const srtString = taskResult.task_result.srt;

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
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="w-3/4 rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800">
            <h2 className="mb-4 text-center text-xl font-semibold">
              SRT Display
            </h2>
            <textarea
              value={srtString}
              readOnly
              className="h-64 w-full resize-none rounded-lg border border-gray-400 p-2 dark:border-gray-500 dark:bg-gray-700 dark:text-white"
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
