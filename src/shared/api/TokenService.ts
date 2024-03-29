export class TokenService {
  static setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  static removeToken = () => {
    localStorage.removeItem("token");
    this.removeRefreshToken();
  };

  static getToken = (): string => {
    return localStorage.getItem("token")!;
  };

  static checkToken = (): boolean => {
    return localStorage.getItem("token") !== null;
  };

  static setRefreshToken = (token: string) => {
    localStorage.setItem("refreshToken", token);
  };

  static removeRefreshToken = () => {
    localStorage.removeItem("refreshToken");
  };

  static getRefreshToken = (): string => {
    return localStorage.getItem("refreshToken")!;
  };

  static checkRefreshToken = (): boolean => {
    return localStorage.getItem("refreshToken") !== null;
  };

  static setTrelloToken = (token: string) => {
    localStorage.setItem("trelloToken", token);
  };

  static removeTrelloToken = () => {
    localStorage.removeItem("trelloToken");
  };

  static getTrelloToken = (): string => {
    return localStorage.getItem("trelloToken")!;
  };

  static checkTrelloToken = (): boolean => {
    return localStorage.getItem("trelloToken") !== null;
  };
}
