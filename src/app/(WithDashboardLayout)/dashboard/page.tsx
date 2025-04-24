import DashboardMain from "@/components/dashboard/main-dashboard/DashboardMain";
import {} from "@/components/ui/breadcrumb";
import {} from "@/components/ui/sidebar";
import { getAllUser, getMe } from "@/services/Auth/authServices";
import { getMyMenu } from "@/services/Menu/menuServices";
import {
  getMealProviderOrder,
  getMyOrder,
} from "@/services/Order/orderServices";
import { getMyProvider } from "@/services/Provider/providerSurvices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; sort: string }>;
}) => {
  const { data } = await getMyMenu();
  const { page, sort } = await searchParams;
  const receivedOrdersData = await getMealProviderOrder(page, sort);
  const myData = await getMyOrder(page);
  const userData = await getMe();
  const providerData = await getMyProvider();
  const allUser = await getAllUser();
  return (
    <div>
      <DashboardMain
        menu={data}
        userData={userData}
        myData={myData}
        receivedOrders={receivedOrdersData}
        providerData={providerData}
        allUser={allUser}
      />
    </div>
  );
};

export default Dashboard;
