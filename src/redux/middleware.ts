"use client";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { logout } from "./slice";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.meta.arg.endpointName == "getProfile") {
        return;
      } else if (
        action?.payload.status == 401 &&
        action.meta.arg.endpointName != "login"
      ) {
        api.dispatch(logout());
      } else {
        const errorData =
          action.payload.data?.error?.message ||
          action.payload.data?.message ||
          action.error.message;
        console.log(errorData);
      }
    }
    return next(action);
  };
