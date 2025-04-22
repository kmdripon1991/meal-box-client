import { Metadata } from "next";
import OrderDetailsAllData from "@/components/modules/order/order-details/OrderDetailsAllData";
import { getSingleOrder } from "@/services/Order/orderServices";
export const metadata: Metadata = {
  title: "Details Orders",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};
const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  const { data } = await getSingleOrder(orderId);
  return (
    <div>
      <OrderDetailsAllData order={data}></OrderDetailsAllData>
    </div>
  );
};

export default OrderDetailsPage;
