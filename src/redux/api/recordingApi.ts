import { baseApi } from "./baseApi";
import {
    RecordingResponse,
} from "../types/recording";

const VIDEO_RECORDING_API = "https://video-recording-service-73zeqjyhhq-et.a.run.app";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getUserRecording: builder.query<RecordingResponse, string>({
        query: (user_id) => ({
          url: VIDEO_RECORDING_API + `/user-file/${user_id}`,
          method: "GET",
        }),
      }),
    }),
  });
  
  export const {
    useGetUserRecordingQuery
  } = authApi;
  