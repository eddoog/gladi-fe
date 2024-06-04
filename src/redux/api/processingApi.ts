import { baseApi } from "./baseApi";
import { TaskResult } from "../types/processing";

const VIDEO_PROCESSING_API = "https://gladiprocessing.anickme.com";

export const processingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskResult: builder.query<TaskResult, string>({
      query: (task_id) => ({
        url: VIDEO_PROCESSING_API + `/task/${task_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTaskResultQuery } = processingApi;
