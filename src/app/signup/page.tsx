import { SignupForm } from "@/components/modules/users/signup/Signup";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create User",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const SignupPage = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
