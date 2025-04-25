import CreateMealProviderForm from "@/components/modules/mealProvider/createMealProvider/CreateMealProvider";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Meal Provider",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const CreateMealProvider = () => {
  return (
    <div>
      <CreateMealProviderForm />
    </div>
  );
};

export default CreateMealProvider;
