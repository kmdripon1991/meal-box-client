"user client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import { IconTransactionBitcoin } from "@tabler/icons-react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitch } from "react-icons/fa";

// Icon Components

// TypeScript interfaces
interface Address {
  district?: string;
  subDistrict?: string;
  post?: string;
  postCode?: string;
  village?: string;
}

interface User {
  fullName?: string;
  phoneNumber?: string;
  secondaryPhone?: string;
  email?: string;
  address?: Address;
  role?: string;
}

interface shopId {
  shopName?: string;
  shopLogo?: string;
  phoneNumber?: string;
  customerServiceContact?: string;
  shopAddress?: string;
  operatingHours?: {
    open?: string;
    close?: string;
    daysOpen?: string[];
  };
  paymentMethods?: string[];
  productCategories?: string[];
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

interface Meal {
  meals: any;
  name?: string;
  price?: number;
  quantity?: number;
}

interface Order {
  meals: any;
  _id?: string;
  orderId?: string;
  createdAt?: string;
  updatedAt?: string;
  paymentStatus?: string;
  total_price?: number;
  transactionId?: string;
  orders?: Meal[];
  shopIdId?: string;
  shopId?: shopId;
  customerId?: User;
  authorId?: string;
}

interface OrderDetailsProps {
  order: Order;
}

const OrderDetailsAllData = ({ order }: OrderDetailsProps) => {
  console.log(order.orders);
  console.log(order);
  if (!order)
    return <div className="p-4 text-center">No order data available</div>;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount?: number) => {
    return amount ? `৳${amount.toFixed(2)}` : "৳0.00";
  };

  const getInitials = (name?: string) => {
    if (!name) return "N/A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="lg:w-2/3 space-y-6">
          {/* Order Summary Card */}
          <Card className="box-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Placed on {formatDate(order?.createdAt)}</span>
                  </div>
                </div>

                <Badge
                  // @ts-expect-error variant
                  variant={
                    order?.paymentStatus === "Paid" ? "success" : "destructive"
                  }
                >
                  {order?.paymentStatus || "Unknown"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* shopId Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={order?.shopId?.shopLogo} />
                  <AvatarFallback>
                    {getInitials(order?.shopId?.shopName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {order?.shopId?.shopName || "Unknown shopId"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {order?.shopId?.shopAddress || "No address provided"}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>

                {order.orders?.length ? (
                  <div className="space-y-6">
                    {order.orders.map((orderItem) =>
                      orderItem?.meals?.map((meal: any) => (
                        <div key={meal._id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">
                                {meal.menu || "Unnamed Item"}
                              </h5>
                              {meal.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {meal.description}
                                </p>
                              )}
                            </div>
                            <span className="font-medium">
                              {formatCurrency(meal.price)}
                            </span>
                          </div>
                          {meal.time && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <ClockIcon className="h-4 w-4" />
                              <span>Best for {meal.time}</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No items in this order
                  </p>
                )}
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span>{formatCurrency(order?.total_price)}</span>
                </div>

                {order?.transactionId && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconTransactionBitcoin className="h-4 w-4" />
                    <span>Transaction ID: {order.transactionId}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* customerId Information Card */}
          <Card className="box-shadow">
            <CardHeader>
              <CardTitle>customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Personal Details</h4>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Name:</span>
                  <span>{order?.customerId?.fullName || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>{order?.customerId?.phoneNumber || "N/A"}</span>
                </div>
                {order?.customerId?.secondaryPhone && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4" />
                    <span>{order.customerId.secondaryPhone}</span>
                  </div>
                )}
                {order?.customerId?.email && (
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4" />
                    <span>{order.customerId.email}</span>
                  </div>
                )}
                {order?.customerId?.role && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Role:</span>
                    <Badge variant="outline">{order.customerId.role}</Badge>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Delivery Address</h4>
                {order?.customerId?.address ? (
                  <>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" />
                      <span>
                        {[
                          order.customerId.address.village,
                          order.customerId.address.subDistrict,
                          order.customerId.address.district,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                    <div>
                      {order.customerId.address.post && (
                        <span>{order.customerId.address.post}, </span>
                      )}
                      {order.customerId.address.postCode && (
                        <span>{order.customerId.address.postCode}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No address provided
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          {/* shopId Details Card */}
          <Card className="box-shadow">
            <CardHeader>
              <CardTitle>shop Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={order?.shopId?.shopLogo} />
                  <AvatarFallback>
                    {getInitials(order?.shopId?.shopName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {order?.shopId?.shopName || "Unknown shopId"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {order?.customerId?.role === "mealProvider"
                      ? "Meal Provider"
                      : "shopId"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{order?.shopId?.phoneNumber || "N/A"}</span>
                </div>

                {order?.shopId?.customerServiceContact && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                    <span>Support: {order.shopId.customerServiceContact}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{order?.shopId?.shopAddress || "No address"}</span>
                </div>

                {order?.shopId?.operatingHours && (
                  <div className="flex items-start gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Operating Hours</p>
                      <p className="text-sm">
                        {order.shopId.operatingHours?.daysOpen?.join(", ") ||
                          "Daily"}
                        : {order.shopId.operatingHours?.open || "N/A"} -{" "}
                        {order.shopId.operatingHours?.close || "N/A"}
                      </p>
                    </div>
                  </div>
                )}

                {order?.shopId?.paymentMethods?.length ? (
                  <div>
                    <p className="font-medium">Payment Methods</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {order.shopId.paymentMethods.map((method, i) => (
                        <Badge key={i} variant="secondary">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                {order?.shopId?.productCategories?.length ? (
                  <div>
                    <p className="font-medium">Categories</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {order.shopId.productCategories.map((cat, i) => (
                        <Badge key={i} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {order?.shopId?.socialMediaLinks && (
                <>
                  <Separator />
                  <div>
                    <p className="font-medium mb-2">Social Media</p>
                    <div className="flex gap-4">
                      {order.shopId.socialMediaLinks.facebook && (
                        <a
                          href={order.shopId.socialMediaLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">Facebook</span>
                            <FaFacebookF />
                          </Button>
                        </a>
                      )}
                      {order.shopId.socialMediaLinks.instagram && (
                        <a
                          href={order.shopId.socialMediaLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">instagram</span>
                            <FaInstagram />
                          </Button>
                        </a>
                      )}
                      {order.shopId.socialMediaLinks.twitter && (
                        <a
                          href={order.shopId.socialMediaLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">twitter</span>
                            <FaTwitch />
                          </Button>
                        </a>
                      )}
                      {order.shopId.socialMediaLinks.linkedin && (
                        <a
                          href={order.shopId.socialMediaLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">linkedin</span>
                            <FaLinkedin />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="w-full">
                Contact shopId
              </Button>{" "}
              <br />
            </CardFooter>
          </Card>

          {/* System Information Card */}
          <Card className="box-shadow">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span>{order?._id || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>{formatDate(order?.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>{formatDate(order?.updatedAt)}</span>
              </div>
              <div className="flex justify-between"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsAllData;
