import UpdateMealProviderForm from "@/components/modules/mealProvider/updateMeapProvider/UpdateMealProvider";
import { getMyProvider } from "@/services/Provider/providerSurvices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Update Meal Provider",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const UpdateMealProvider = async () => {
  const { data } = await getMyProvider();
  return (
    <div>
      <UpdateMealProviderForm data={data} />
    </div>
  );
};

export default UpdateMealProvider;
