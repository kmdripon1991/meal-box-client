import { ChangePasswordForm } from "@/components/modules/user/ChangePasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const ChangePassword = () => {
  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;
