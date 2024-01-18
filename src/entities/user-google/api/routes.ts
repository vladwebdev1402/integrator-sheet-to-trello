import { environment } from "@/shared/constants";

export const authApiRoutes = {
    getToken: `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${environment.authQuery.client_id}&redirect_uri=${environment.authQuery.redirect_uri}&client_secret=${environment.clientSecret}`, // обновить и запросить токен
    logout: (token: string) => "https://oauth2.googleapis.com/revoke?token=" + token, // выход из аккаунта
    getUserInfo: "https://www.googleapis.com/oauth2/v2/userinfo", // получить информацию о пользователе
}