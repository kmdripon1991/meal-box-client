/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/components/ui/paginaciton";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { menuDelete } from "@/services/Menu/menuServices";
import { useRouter } from "next/navigation";

const DeleteMenu = ({ menus }: { menus: any }) => {
  const router = useRouter();
  console.log(menus.data);
  const hasmenus = menus?.data?.length > 0;
  const handelDeleteMenuForAdmin = async (_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await menuDelete(_id);
       
          if (result?.success) {
            toast.success(result?.message, { duration: 3000 });
            router.refresh();
          } else {
            toast.error(result?.message, { duration: 3000 });
          }
        } catch (error: any) {
          toast.error("An error occurred while updating profile.", {
            duration: 2000,
          });
          console.error(error);
        }
      }
    });
  };
  return (
    <div className="m-5 bmenu p-2 rounded-md shadow-sm overflow-x-auto">
      {hasmenus ? (
        <>
          <div className="mt-5"></div>
          <Table className="min-w-full">
            <TableCaption>A list of your recent menus.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Shop Logo</TableHead>
                <TableHead className="min-w-[120px]">Shop Name</TableHead>
                <TableHead className="min-w-[120px]">Author Name</TableHead>
                <TableHead className="min-w-[100px]">Author Email</TableHead>
                <TableHead className="min-w-[120px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menus?.data?.map((menu: any, index: any) => (
                <TableRow key={menu.id || `menu-${index}`}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={menu?.shopId?.shopLogo} />
                      <AvatarFallback>{menu?.shopId?.shopName}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {menu?.shopId?.shopName}
                  </TableCell>
                  <TableCell>{menu?.author_id?.fullName}</TableCell>
                  <TableCell>{menu?.author_id?.email}</TableCell>

                  <TableCell>
                    <Button onClick={() => handelDeleteMenuForAdmin(menu?._id)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination total={menus.meta.totalPage} />
        </>
      ) : (
        <Card className="p-6 text-center my-4">
          <h3 className="text-lg font-medium">No menus Found</h3>
          <p className="text-muted-foreground mt-2">
            You don,t have any menus yet. When you make an menu, it will appear
            here.
          </p>
        </Card>
      )}
    </div>
  );
};

export default DeleteMenu;
