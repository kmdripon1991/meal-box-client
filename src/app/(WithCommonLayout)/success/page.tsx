import PaymentSuccessPage from "@/components/success_and_faild/Success";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Payment Success",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const success = () => {
  return (
    <div>
      <PaymentSuccessPage />
    </div>
  );
};

export default success;
