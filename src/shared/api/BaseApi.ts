import axios, { AxiosError } from "axios";
import { TokenService } from "./TokenService";
import { environment } from "../constants";

const customAxios = axios.create();

const refresh_url = (token: string) => `https://oauth2.googleapis.com/token?client_id=${environment.authQuery.client_id}&client_secret=${environment.clientSecret}&grant_type=refresh_token&refresh_token=${token}`;

customAxios.interceptors.request.use(
  (req) => {
    req.headers.Authorization = "Bearer " + TokenService.getToken();
    return req;
  },
  (err) => Promise.reject(err)
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    try {
      const {response} = error;
      if (response && response.status === 401) {
        const originalRequest = error.config!;
        const res = await axios.post<any, {data: {access_token: string}}>(refresh_url(TokenService.getRefreshToken()));
        TokenService.setToken(res.data.access_token);
        return customAxios.request(originalRequest);
      }
    }
    catch (e) {
      return Promise.reject(e);
    }
  }
);

export class BaseAPI {
  static get = async <T>(url: string, query?: any) => {
    const response = await customAxios.get<T>(url, query);
    return response.data;
  };
}
