import { useParams } from "react-router-dom";
import { ChatbotAnalysisResult } from "../components/chatbot/ChatbotAnalysisResult";
import { ChatbotChat } from "../components/chatbot/ChatbotChat";
import { useGetChatbotAnalysisQuery } from "../redux/api/chatbotApi";

export function ResultPage() {
  const { id } = useParams();
  const feedback_id = "59fc6455-01a6-493a-8979-f86e5b6602bb";

  const { data: feedback_data, refetch } =
    useGetChatbotAnalysisQuery(feedback_id);

  return (
    <div className="flex w-full flex-1 flex-wrap items-stretch justify-center gap-8 px-8 py-2">
      <div className="video w-[600px] bg-slate-200">
        <iframe
          width="600"
          height="350"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
          title="Video Example"
        ></iframe>
      </div>
      <div className="chatbot mb-4 flex w-[800px] flex-col">
        <ChatbotAnalysisResult result={feedback_data?.analysis} />
        <ChatbotChat
          chat_history={feedback_data?.chat_history}
          feedback_id={feedback_id}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
