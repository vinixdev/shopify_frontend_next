import React from "react";
import LoginForm from "../../components/authentication/LoginForm";
import Auth from "../../components/layouts/Auth";

export default function login() {
  return (
    <Auth title="ورود به حساب کاربری">
      <LoginForm />
    </Auth>
  );
}
