import UpdateProfile from "@/components/modules/user/UpdateProfileForm";
import { getMe } from "@/services/Auth/authServices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Profile",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};

const UpdateProfilePage = async () => {
  const { data } = await getMe();
  return (
    <div>
      <UpdateProfile data={data}></UpdateProfile>
    </div>
  );
};

export default UpdateProfilePage;
