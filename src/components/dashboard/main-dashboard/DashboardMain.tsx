"use client";
import React from "react";
import { MealProviderDashboard } from "./MealProviderDashboard";
import SimpleCustomerDashboard from "./CustomerDashboard";
import { useUser } from "@/context/UserContext";

const DashboardMain = ({
  menu,
  receivedOrders,
  myData,
  userData,
  providerData,
}: {
  menu: any;
  receivedOrders: any;
  myData: any;
  userData: any;
  providerData: any;
}) => {
  const { user }: any = useUser();
  return (
    <div>
      {user?.role === "mealProvider" ? (
        <MealProviderDashboard
          menu={menu}
          receivedOrdersData={receivedOrders}
          providerData={providerData}
        />
      ) : (
        <SimpleCustomerDashboard menu={myData} user={userData} />
      )}
    </div>
  );
};

export default DashboardMain;
