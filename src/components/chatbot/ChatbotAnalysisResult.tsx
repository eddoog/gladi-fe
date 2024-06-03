import { ChatbotAnalysis } from "../../redux/types/chatbot";

type ChatbotAnalysisResultProps = {
  result: ChatbotAnalysis | undefined;
};

export function ChatbotAnalysisResult({ result }: ChatbotAnalysisResultProps) {
  return (
    <div className="mb-4 rounded-md bg-blue-500 p-4 text-white">
      <h2 className="sticky mb-4 text-2xl font-bold">Analysis Result</h2>
      <div className="h-52 overflow-y-auto">
        <section className="mb-2 overflow-auto">
          <h3 className="text-lg font-bold">Goods</h3>
          <ul className="ml-4 list-disc">
            {result?.goods.map((good) => <li>{good}</li>)}
          </ul>
        </section>
        <section className="mb-2">
          <h3 className="text-lg font-bold">Bads</h3>
          <ul className="ml-4 list-disc">
            {result?.bads.map((bad) => <li>{bad}</li>)}
          </ul>
        </section>
        <section className="mb-2">
          <h3 className="text-lg font-bold">Corrections</h3>
          <ul className="ml-4 list-disc">
            {result?.corrections.map((correction) => <li>{correction}</li>)}
          </ul>
        </section>
        <section className="mb-2">
          <h3 className="text-lg font-bold">Suggestions</h3>
          <ul className="ml-4 list-disc">
            {result?.suggestions.map((suggestion) => <li>{suggestion}</li>)}
          </ul>
        </section>
        <section className="mb-2">
          <h3 className="text-lg font-bold">Overall Feedback</h3>
          <p>{result?.overall_feedback}</p>
        </section>
      </div>
    </div>
  );
}
