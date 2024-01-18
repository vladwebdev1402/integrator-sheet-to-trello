import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { TokenService } from "../api";
import axios from "axios";
import { environment } from "../constants";

const refresh_url = `https://oauth2.googleapis.com/token?client_id=${
  environment.authQuery.client_id
}&client_secret=${
  environment.clientSecret
}&grant_type=refresh_token&refresh_token=${TokenService.getRefreshToken()}`;

const baseQuery = fetchBaseQuery({
  baseUrl: "https://sheets.googleapis.com",
  prepareHeaders: (headers) => {
    headers.set(`Authorization`, `Bearer ${TokenService.getToken()}`);
    return headers;
  },
});

export const baseGoogleQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args = "", api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      const res = await axios.post<any, { data: { access_token: string } }>(
        refresh_url
      );
      TokenService.setToken(res.data.access_token);
      result = await baseQuery(args, api, extraOptions);
    } finally {
      return result;
    }
  }
  return result;
};
