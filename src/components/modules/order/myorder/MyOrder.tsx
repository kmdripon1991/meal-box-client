/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/components/ui/paginaciton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchAndSort from "./SearchAndSort";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MyOrder = ({ orders }: { orders: any }) => {
  console.log(orders.data);
  const hasOrders = orders?.data?.length > 0;

  return (
    <div className="m-5 border p-2 rounded-md shadow-sm overflow-x-auto">
      {hasOrders ? (
        <>
          <div className="mt-5">
            <SearchAndSort />
          </div>
          <Table className="min-w-full">
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Shop Logo</TableHead>
                <TableHead className="min-w-[120px]">Shop Name</TableHead>
                <TableHead className="min-w-[120px]">Author Name</TableHead>
                <TableHead className="min-w-[120px]">Shop C Number</TableHead>
                <TableHead className="min-w-[100px]">Total Price</TableHead>
                <TableHead className="min-w-[120px]">Payment Status</TableHead>
                <TableHead className="min-w-[120px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.data?.map((order: any, index: any) => (
                <TableRow key={order.id || `order-${index}`}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={order?.shopId?.shopLogo} />
                      <AvatarFallback>{order?.shopId?.shopName}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {order?.shopId?.shopName}
                  </TableCell>
                  <TableCell>{order?.authorId?.fullName}</TableCell>
                  <TableCell>{order?.shopId?.customerServiceContact}</TableCell>
                  <TableCell>${order?.total_price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        order.paymentStatus === "success"
                          ? "bg-green-100 text-green-800"
                          : order.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.paymentStatus === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/order/order-details/${order._id}`}>
                      <Button>Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination total={orders.meta.totalPage} />
        </>
      ) : (
        <Card className="p-6 text-center my-4">
          <h3 className="text-lg font-medium">No Orders Found</h3>
          <p className="text-muted-foreground mt-2">
            You don't have any orders yet. When you make an order, it will
            appear here.
          </p>
        </Card>
      )}
    </div>
  );
};

export default MyOrder;
