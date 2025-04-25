import { TUser } from "@/types";
import { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = ({ allUser }: { allUser: any }) => {
  const [allCustomers, setAllCustomers] = useState<TUser[]>([]);
  const [allMealProviders, setAllMealProviders] = useState<TUser[]>([]);

  useEffect(() => {
    if (allUser?.data?.data) {
      const customers = allUser.data.data.filter(
        (user: TUser) => user.role === "customer"
      );
      const mealProviders = allUser.data.data.filter(
        (user: TUser) => user.role === "mealProvider"
      );

      setAllCustomers(customers);
      setAllMealProviders(mealProviders);
    }
  }, [allUser]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <main className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl flex items-center justify-center gap-1.5 font-semibold text-center">
            <MdAdminPanelSettings /> Admin Dashboard
          </h1>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Customer</p>
            <p className="mt-1 text-xl font-bold">{allCustomers.length}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">All Meal Provider</p>
            <p className="mt-1 text-xl font-bold">{allMealProviders.length}</p>
          </div>
        </div>

        {/* Tabbed Content */}
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
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allCustomers.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{user.fullName}</div>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allMealProviders.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
