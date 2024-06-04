import { baseApi } from './baseApi';
import {
  ChatbotAskingFeedbackRequest,
  ChatbotResponse
} from '../types/chatbot';

// const CHATBOT_API = "http://127.0.0.1:8000";
const CHATBOT_API = 'https://feedback-chatbot-service-73zeqjyhhq-et.a.run.app';

export const chatbotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatbotAnalysis: builder.query<ChatbotResponse, string>({
      query: (feedbackId) => ({
        url: `${CHATBOT_API}/api/video-feedbacks/${feedbackId}`,
        method: 'GET'
      })
    }),
    askChatbotFeedback: builder.mutation<
      ChatbotResponse,
      { body: ChatbotAskingFeedbackRequest; feedbackId: string }
    >({
      query: ({ body, feedbackId }) => ({
        url: `${CHATBOT_API}/api/video-feedbacks/${feedbackId}`,
        method: 'PATCH',
        body
      })
    })
  })
});

export const { useGetChatbotAnalysisQuery, useAskChatbotFeedbackMutation } =
  chatbotApi;
