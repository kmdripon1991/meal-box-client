/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MealProviderReceivedOrder from "@/components/modules/order/mealProviderRecivedOrder/MealProviderReceivedOrder";
import Link from "next/link";

export function MealProviderDashboard({
  menu,
  receivedOrdersData,
  providerData,
}: {
  menu: any;
  receivedOrdersData: any;
  providerData: any;
}) {
  const date = new Date();
  const today = date.toLocaleDateString("en-US", { weekday: "long" });
  // Or if your menu.day uses YYYY-MM-DD format:
  // const today = date.toISOString().split('T')[0];
  console.log("get my", providerData);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Meal Provider Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={providerData?.data?.shopLogo} />
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Overview Card */}
        <Card className="border-pink-200">
          <CardHeader>
            <CardTitle className="">Today,s Meals</CardTitle>
            <CardDescription>Orders & Deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Prepared</span>
                <span className="font-bold">124</span>
              </div>
              <Progress value={75} className="h-2 bg-pink-100" />

              <div className="flex justify-between">
                <span>Delivered</span>
                <span className="font-bold">92</span>
              </div>
              <Progress value={60} className="h-2 bg-purple-100" />
            </div>
          </CardContent>
        </Card>

        {/* Menu Card */}
        <Card className="border-purple-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="">Today’s Menu</CardTitle>
            <CardDescription>Available meal options</CardDescription>
          </CardHeader>
          <CardContent>
            {menu?.meals?.length > 0 ? (
              menu.meals.map((menuItem: any, index: number) =>
                menuItem.day === today ? (
                  <div key={index} className="space-y-6">
                    {/* Morning */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium text-gray-700">
                        Morning
                      </h3>
                      <p className="text-gray-900">{menuItem.morning.menu}</p>
                      <p className="text-sm text-gray-500">
                        Price: {menuItem.morning.price}
                      </p>
                    </div>
                    {/* Evening */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium text-gray-700">
                        Evening
                      </h3>
                      <p className="text-gray-900">{menuItem.evening.menu}</p>
                      <p className="text-sm text-gray-500">
                        Price: {menuItem.evening.price}
                      </p>
                    </div>
                    {/* Night */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">
                        Night
                      </h3>
                      <p className="text-gray-900">{menuItem.night.menu}</p>
                      <p className="text-sm text-gray-500">
                        Price: {menuItem.night.price}
                      </p>
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <div className="text-center space-y-2">
                <h1>Add Meals</h1>
                <Link
                  href="/dashboard/menu/create-menu"
                  className="text-blue-500 underline"
                >
                  Go to Create Menu
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Schedule Card */}
        <Card className="border-indigo-200">
          <CardHeader>
            <CardTitle className="">Delivery Schedule</CardTitle>
            <CardDescription>Upcoming deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Orders Card */}
        <Card className="border-blue-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <MealProviderReceivedOrder orders={receivedOrdersData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
