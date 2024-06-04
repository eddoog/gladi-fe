import clsx from 'clsx';
import { SendHorizonal } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import { useAskChatbotFeedbackMutation } from '../../redux/api/chatbotApi';
import { ChatbotHistory } from '../../redux/types/chatbot';

type ChatbotChatProps = {
  feedback_id: string;
  chat_history: ChatbotHistory[] | undefined;
  refetch: () => unknown;
};

type Inputs = {
  question: string;
};

export function ChatbotChat({
  feedback_id,
  chat_history,
  refetch
}: Readonly<ChatbotChatProps>) {
  const [askChatbotFeedback, { isLoading }] = useAskChatbotFeedbackMutation();
  const { register, handleSubmit, reset, getValues } = useForm<Inputs>();
  const chatContainer = useRef(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await askChatbotFeedback({
      body: {
        question: data.question
      },
      feedbackId: feedback_id
    }).unwrap();
    reset();
    refetch();
  };

  useEffect(() => {
    if (chatContainer.current === null) return;

    const height = (chatContainer.current as HTMLDivElement).scrollHeight;
    (chatContainer.current as HTMLDivElement).scrollTo(0, height);
  }, [chat_history, isLoading]);

  return (
    <div className="flex h-full flex-col rounded-md bg-slate-200 p-2">
      <div
        className="mb-2 max-h-[320px] min-h-[320px] flex-1 overflow-auto rounded-md bg-white p-2"
        ref={chatContainer}
      >
        {chat_history?.map((chat, index) => (
          <React.Fragment key={index}>
            {chat.message.data.type === 'human' && (
              <UserMessage message={chat.message.data.content} />
            )}
            {chat.message.data.type === 'ai' && (
              <ChatbotMessage message={chat.message.data.content} />
            )}
          </React.Fragment>
        ))}
        {isLoading && <UserMessage message={getValues('question')} />}
        {isLoading && <ChatbotMessage message={'...'} isLoading={true} />}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <input
            id="question"
            autoComplete="off"
            placeholder="Enter Message to Chatbot"
            className="flex-1 rounded-xl border-slate-200 bg-white p-2"
            required
            {...register('question')}
          />
          <button
            type="submit"
            aria-label="Submit Question"
            className={`rounded-xl bg-blue-500 p-2 ${clsx({ 'hover:brightness-75': !isLoading, 'bg-slate-400': isLoading })}`}
            disabled={isLoading}
          >
            <SendHorizonal aria-hidden={true} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}

function ChatbotMessage({
  message,
  isLoading = false
}: Readonly<{ message: string; isLoading?: boolean }>) {
  return (
    <div
      className={`mb-2 mr-6 w-fit rounded-xl bg-slate-200 p-2 ${clsx({
        'animate-pulse': isLoading
      })}`}
    >
      <Markdown>
        {message || 'There is something wrong. Please try again!'}
      </Markdown>
    </div>
  );
}

function UserMessage({ message }: Readonly<{ message: string }>) {
  return (
    <div className="flex justify-end">
      <div className="mb-2 ml-4 w-fit rounded-xl bg-blue-500 p-2 text-white">
        {message}
      </div>
    </div>
  );
}
