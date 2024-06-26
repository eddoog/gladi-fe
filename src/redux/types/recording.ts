export type Recording = {
  id: number;
  user_id: string;
  file_name: string;
  file_link: string;
  video_link: string;
  task_id: string;
  lang: string;
};

export type RecordingResponse = Recording[];
