import axios from "axios";
import { TokenService } from "./TokenService";
import { environment } from "../constants";

const customAxios = axios.create({
  baseURL: "https://api.trello.com/1",
});

customAxios.interceptors.request.use(
  (req) => {
    req.headers.Authorization = "Bearer " + TokenService.getTrelloToken();
    return req;
  },
  (err) => Promise.reject(err)
);

export class BaseTrelloAPI {
  static query = { key: environment.trelloQuery.key };

  static get = async <T>(url: string, params?: any) => {
    const response = await customAxios.get<T>(url, {
      params: { ...this.query, ...params },
    });
    return response.data;
  };

  static delete = async <T, R>(url: string, params?: any) => {
    const response = await customAxios.delete<T, R>(url, {
      params: { ...this.query, ...params },
    });
    return response;
  };
}
