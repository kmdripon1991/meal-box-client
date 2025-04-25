import DetailsMenu from "@/components/home/DetailsMenu";
import { getSingleMenu } from "@/services/Menu/menuServices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Details Meal Provider",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const DetailsMenuPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  const { data } = await getSingleMenu(orderId);
  return (
    <div>
      <DetailsMenu menu={data}></DetailsMenu>
    </div>
  );
};

export default DetailsMenuPage;
