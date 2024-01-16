import axios from "axios";
import { TokenService } from "./TokenService";

const customAxios = axios.create()

customAxios.interceptors.request.use(
    (req) => {
      req.headers.Authorization = "Bearer " + TokenService.getToken()
      return req;
    },
    (err) => Promise.reject(err)
  );

export class BaseAPI {
    static get = async <T>(url: string, query?: any) => {
        const response = await customAxios.get<T>(url, query);
        return response.data;
    } 
}