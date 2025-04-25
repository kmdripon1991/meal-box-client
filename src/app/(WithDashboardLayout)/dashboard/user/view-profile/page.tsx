import ViewProfile from "@/components/modules/user/ViewProfile";
import { getMe } from "@/services/Auth/authServices";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Details Profile",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const DetailsProfile = async () => {
  const { data } = await getMe();
  return (
    <div>
      <ViewProfile data={data}></ViewProfile>
    </div>
  );
};

export default DetailsProfile;
