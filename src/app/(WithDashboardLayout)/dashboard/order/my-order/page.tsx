import MyOrder from "@/components/modules/order/myorder/MyOrder";
import { getMyOrder } from "@/services/Order/orderServices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Customer Orders",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};

const MyOrderPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getMyOrder(page);
  return (
    <div>
      <MyOrder orders={data} />
    </div>
  );
};

export default MyOrderPage;
