import axios from "axios";
import { authApiRoutes } from "./routes";
import { IResponseGetToken, IResponseUserInfo } from "./types";
import { BaseAPI, TokenService } from "@/shared/api";

export class AuthApi {
  static getToken = async (code: string) => {
    const response = await axios.post<any, IResponseGetToken>(
      authApiRoutes.getToken + `&code=${code}`,
      null,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  };

  static getUserInfo = async () => {
      const response = await BaseAPI.get<IResponseUserInfo>(
      authApiRoutes.getUserInfo
    );
    return response;
  };

  static logout = async () => {
    const token = TokenService.getToken();
    const response = await axios.post(authApiRoutes.logout(token));
    return response;
  };
}
