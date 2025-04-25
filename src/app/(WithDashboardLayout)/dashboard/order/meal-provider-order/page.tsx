import MealProviderReceivedOrder from "@/components/modules/order/mealProviderRecivedOrder/MealProviderReceivedOrder";
import { getMealProviderOrder } from "@/services/Order/orderServices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: " Meal Provider orders",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const MealProviderOrders = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string }>;
}) => {
  const { page, sort } = await searchParams;
  const data = await getMealProviderOrder(page, sort);
  return (
    <div>
      <MealProviderReceivedOrder orders={data} />
    </div>
  );
};

export default MealProviderOrders;
