"use client";
import { TUser } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import Pagination from "../ui/paginaciton";
import { toast } from "sonner";
import { changeUserStatus } from "@/services/Auth/authServices";
import { useRouter } from "next/navigation";

type UserDataResponse = {
  data: TUser[];
  meta: {
    totalPage: number;
    totalCustomers?: number;
    totalProviders?: number;
  };
};

const AllUser = ({ data }: { data: UserDataResponse }) => {
  const [allCustomers, setAllCustomers] = useState<TUser[]>([]);
  const [allMealProviders, setAllMealProviders] = useState<TUser[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (data?.data) {
      const customers = data.data.filter(
        (user: TUser) => user.role === "customer"
      );
      const mealProviders = data.data.filter(
        (user: TUser) => user.role === "mealProvider"
      );

      setAllCustomers(customers);
      setAllMealProviders(mealProviders);
    }
  }, [data]);

  const handleBlockUser = async (userId: string, isBlocked?: boolean) => {
    const blockUserData = {
      id: userId,
      status: {
        isBlock: isBlocked === false ? true : false,
      },
    };
    console.log(blockUserData);
    const result = await changeUserStatus(blockUserData);
    if (result?.success) {
      toast.success(result?.message, { duration: 3000 });
      router.refresh();
    } else {
      toast.error(result?.message, { duration: 3000 });
    }
  };

  const handleDeleteUser = async (userId: string, isDelete?: boolean) => {
    const deleteUserData = {
      id: userId,
      status: {
        isDelete: isDelete === false ? true : false,
      },
    };

    const result = await changeUserStatus(deleteUserData);
    if (result?.success) {
      toast.success(result?.message, { duration: 3000 });
      router.refresh();
    } else {
      toast.error(result?.message, { duration: 3000 });
    }
  };

  return (
    <div className="bg-white rounded shadow overflow-hidden p-5">
      <Tabs defaultValue="customers">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="providers">Meal Providers</TabsTrigger>
        </TabsList>

        {/* Customers Tab */}
        <TabsContent value="customers">
          <div className="p-4 overflow-x-auto">
            <Table>
              <TableCaption>List of all customers</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-right">Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCustomers.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {user.fullName || user.name}
                      </div>
                      <div className="text-sm text-gray-500 sm:hidden">
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-right capitalize">
                      {user.role}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleBlockUser(user._id, user.isBlock)}
                        aria-label={user.isBlock ? "true" : "false"}
                      >
                        {user.isBlock ? "Unblock" : "Block"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDeleteUser(user._id, user.isDelete)
                        }
                        aria-label={user.isDelete ? "false" : "true"}
                      >
                        {user.isDelete ? "Restore" : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination total={data.meta.totalPage} />
        </TabsContent>

        {/* Meal Providers Tab */}
        <TabsContent value="providers">
          <div className="p-4 overflow-x-auto">
            <Table>
              <TableCaption>List of all meal providers</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-right">Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allMealProviders.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {user.name || user.fullName}
                      </div>
                      <div className="text-sm text-gray-500 sm:hidden">
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-right capitalize">
                      {user.role}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleBlockUser(user._id, user.isBlock)}
                        aria-label={user.isBlock ? "false" : "true"}
                      >
                        {user.isBlock ? "Unblock" : "Block"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDeleteUser(user._id, user.isDelete)
                        }
                        aria-label={user.isDelete ? "false" : "true"}
                      >
                        {user.isDelete ? "Restore" : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination total={data.meta.totalPage} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllUser;
