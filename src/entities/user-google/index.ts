import { checkGoogleAuth } from "./model/AuthGoogleSlice";
import AuthGoogleReducer from "./model/AuthGoogleSlice";
import GoogleProfile from "./ui/GoogleProfile/GoogleProfile";
import {
  authGoogleWithCode,
  getGoogleUserInfo,
  logoutGoogle,
} from "./model/actionCreator";
import { IGoogleUser } from "./model/types";

export {
  GoogleProfile,
  AuthGoogleReducer,
  authGoogleWithCode,
  getGoogleUserInfo,
  checkGoogleAuth,
  logoutGoogle,
};

export type { IGoogleUser };
