import UpdateMenu from "@/components/modules/menu/updatemenu/UpdateMenu";
import { getMyMenu } from "@/services/Menu/menuServices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Update Menu",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const UpdateMenuPage = async () => {
  const { data } = await getMyMenu();
  console.log(data);
  return (
    <div>
      <UpdateMenu data={data}></UpdateMenu>
    </div>
  );
};

export default UpdateMenuPage;
