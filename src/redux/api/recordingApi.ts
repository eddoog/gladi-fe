import { baseApi } from "./baseApi";
import { RecordingResponse, Recording } from "../types/recording";

const VIDEO_RECORDING_API =
  "https://video-recording-service-73zeqjyhhq-et.a.run.app";

export const recordingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserRecording: builder.query<RecordingResponse, string>({
      query: (user_id) => ({
        url: VIDEO_RECORDING_API + `/user-file/${user_id}`,
        method: "GET",
      }),
    }),
    getUserSpecificFiles: builder.query<
      Recording,
      { user_id: string; file_name: string }
    >({
      query: ({ user_id, file_name }) => ({
        url: VIDEO_RECORDING_API + `/user-file/${user_id}/${file_name}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserRecordingQuery, useGetUserSpecificFilesQuery } =
  recordingApi;
