import React from "react";

import { useRecoilValue } from "recoil";
import authScreenAtom from "../atom/authAtom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === "login" ? <Login /> : <SignUp />}</>;
};

export default AuthPage;
