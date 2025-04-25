import { MyMenuCard } from "@/components/modules/menu/myMenu/MyMenu";
import { getMyMenu } from "@/services/Menu/menuServices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My menu",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const MyMenuPage = async () => {
  const { data } = await getMyMenu();

  return (
    <div>
      <MyMenuCard data={data}></MyMenuCard>
    </div>
  );
};

export default MyMenuPage;
