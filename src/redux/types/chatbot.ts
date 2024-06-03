export type ChatbotResponse = {
  index_name: string;
  content_is_matched_with_context: boolean;
  id: string;
  analysis: ChatbotAnalysis;
  chat_history: ChatbotHistory[];
};

export type ChatbotAnalysis = {
  overall_feedback: string;
  bads: string[];
  corrections: string[];
  id: string;
  goods: string[];
  suggestions: string[];
  feedback_id: string[];
};

export type ChatbotHistory = {
  message: {
    data: {
      id: string;
      name: string;
      type: "human" | "ai";
      content: string;
      example: boolean;
      additional_kwargs: JSON;
      response_metadata: JSON;
    };
    type: "human" | "ai";
  };
  created_at: string;
};

export type ChatbotAskingFeedbackRequest = {
  question: string;
};

export type ChatbotFeedbackResponse = {
  answer: string;
}
