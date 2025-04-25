"use client";
import React from "react";
import { MealProviderDashboard } from "./MealProviderDashboard";
import SimpleCustomerDashboard from "./CustomerDashboard";
import { useUser } from "@/context/UserContext";
import AdminDashboard from "./AdminDashboard";

const DashboardMain = ({
  menu,
  receivedOrders,
  myData,
  userData,
  providerData,
  allUser,
}: {
  menu: any;
  receivedOrders: any;
  myData: any;
  userData: any;
  providerData: any;
  allUser: any;
}) => {
  const { user }: any = useUser();
  return (
    <div>
      {user?.role === "admin" && <AdminDashboard allUser={allUser} />}
      {user?.role === "mealProvider" && (
        <MealProviderDashboard
          menu={menu}
          receivedOrdersData={receivedOrders}
          providerData={providerData}
        />
      )}
      {user?.role === "customer" && (
        <SimpleCustomerDashboard menu={myData} user={userData} />
      )}
    </div>
  );
};

export default DashboardMain;
