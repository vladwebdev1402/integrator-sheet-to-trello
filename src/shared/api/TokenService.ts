export class TokenService {
    static setToken = (token: string) => {
        localStorage.setItem("token", token);
    }

    static removeToken = () => {
        localStorage.removeItem("token");
    }

    static getToken = (): string => {
        return localStorage.getItem("token")!;
    }

    static checkToken = ():boolean => {
        return localStorage.getItem("token") !== null;
    }
 }