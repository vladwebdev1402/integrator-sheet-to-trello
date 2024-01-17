import { BaseTrelloAPI } from "@/shared/api/BaseTrelloApi"
import { IUserInfoReponse } from "./types"
import { TokenService } from "@/shared/api"

export class AuthApi {
    static getUserInfo = async () => {
        const url = `/tokens/${TokenService.getTrelloToken()}/member`;
        const response = await BaseTrelloAPI.get<IUserInfoReponse>(url);
        return response;
    }

    static logout = async () => {
        const url = `/tokens/${TokenService.getTrelloToken()}`;
        await BaseTrelloAPI.delete(url);
    }
}