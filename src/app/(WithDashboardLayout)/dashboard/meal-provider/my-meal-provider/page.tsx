import ShopInfoCard from "@/components/modules/mealProvider/MealProvider/MealProvider";
import { getMyProvider } from "@/services/Provider/providerSurvices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Meal Provider",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const MyMealProvider = async () => {
  const { data } = await getMyProvider();
  return (
    <div>
      <ShopInfoCard data={data}></ShopInfoCard>
    </div>
  );
};

export default MyMealProvider;
