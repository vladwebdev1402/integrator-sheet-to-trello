export interface IResponseGetToken {
  data: {
    access_token: string;
    expires_in: number;
    id_token: string;
    scope: string;
    token_type: string;
    refresh_token: string;
  };
}

export interface IResponseUserInfo {
  locale: string;
  given_name: string;
  picture: string;
  id: string;
  name: string;
  verified_email: boolean;
  email: string;
}
