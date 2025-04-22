import { LoginForm } from "@/components/modules/auth/login/Login";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Login ",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
