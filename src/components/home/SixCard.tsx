/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/IphoneCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlignLeft, ShoppingCart } from "lucide-react";

import Link from "next/link";
import { IconDetails } from "@tabler/icons-react";
import { FaExternalLinkAlt } from "react-icons/fa";

export const SixCard = ({ data }: { data: any }) => {
  return (
    <>
      {data?.length > 0 && (
        <div>
          <h1 className="text-2xl md:text-4xl text-center pt-6 md:pt-10 font-bold">
            Menu
          </h1>
          <div className="max-w-md  mx-auto border-b-2 mt-4 mb-8 border-[#424242]"></div>
        </div>
      )}
      <div className="grid grid-cols-1 pt-8 md:pt-12 pb-10 md:pb-20 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map((menu: any, index: number) => {
          // Calculate total for this specific menu
          const menuTotal =
            menu.meals?.reduce(
              (sum: number, day: any) =>
                sum +
                (day.morning?.price || 0) +
                (day.evening?.price || 0) +
                (day.night?.price || 0),
              0
            ) || 0;

          return (
            <div
              style={{
                boxShadow: "8px 8px 8px",
                borderRadius: "10px",
              }}
              key={menu._id} // Better to use menu._id instead of index
            >
              <Card className="bg-[#130707] text-white max-w-sm w-full rounded-xl p-2">
                {/* Image */}
                <div className="bg-gray-600 w-full h-64 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={menu?.menuImage}
                    className="h-full w-full object-cover"
                    alt={menu.shopId?.shopName || "Menu image"}
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {menu.shopId?.shopName || "Untitled Menu"}
                  </h2>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {menu.meals?.length || 0} days meal plan • Various delicious
                    options
                  </p>

                  {/* Price */}
                  <div className="flex gap-2.5">
                    <p className="text-[16px] font-semibold">Weekly Price</p>
                    <p className="text-[16px] font-bold">
                      ${menuTotal.toFixed(2)}
                    </p>
                  </div>

                  {/* Button */}
                  <div className=" mt-4 flex justify-between">
                    <div className="flex flex-col gap-2 mt-4">
                      <Link href={`/details-menu/${menu._id}`}>
                        <Button className="w-full cursor-pointer px-2">
                          <FaExternalLinkAlt className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </Link>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <Link href={`/dashboard/order/details-menu/${menu._id}`}>
                        <Button className="w-full cursor-pointer">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Order now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      {data?.length <= 6 && (
        <div className="flex justify-center  mb-10 md:mb-16">
          <Link href={"/dashboard/menu/all-menu"}>
            <Button className="cursor-pointer">
              View All Menu <FaExternalLinkAlt />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
