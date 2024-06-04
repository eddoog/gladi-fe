export type Task = {
  text: string;
  srt: string;
  feedback_id: string;
  error: string;
};

export type TaskResult = {
  task_id: string;
  task_status: string;
  task_result: Task;
};
