import React from "react";

import { AuthByGoogle } from "@/features/auth-google";
import { LogoutGoogle } from "@/features/logout-google";
import { GoogleProfile } from "@/entities/user-google";

const ProfilePage = () => {
  return (
    <>
      <GoogleProfile AuthByGoogle={AuthByGoogle} Logout={LogoutGoogle} />
    </>
  );
};

export default ProfilePage;
