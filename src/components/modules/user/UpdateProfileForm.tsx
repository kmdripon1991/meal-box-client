/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { TUser } from "@/types";
import { toast } from "sonner";
import { updateProfile } from "@/services/Auth/authServices";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/ui/Loading/Loader";

// Define form values type based on TUser
type FormValues = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  secondaryPhone?: string;
  address: {
    village: string;
    district: string;
    subDistrict: string;
    post: string;
    postCode: string;
  };
};

const UpdateProfileForm = ({ data }: { data: TUser }) => {
  console.log(data);
  // Initialize form with default values and proper typing
  const form = useForm<FormValues>({
    defaultValues: {
      fullName: data.fullName || "",
      dateOfBirth: data.dateOfBirth || "",
      gender: data.gender || "",
      phoneNumber: data.phoneNumber || "",
      secondaryPhone: data.secondaryPhone || "",
      address: {
        village: data.address?.village || "",
        district: data.address?.district || "",
        subDistrict: data.address?.subDistrict || "",
        post: data.address?.post || "",
        postCode: data.address?.postCode || "",
      },
    },
  });
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Update profile ...........", {
      duration: 2000,
    });

    try {
      const result = await updateProfile(data);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 2000 });
        router.push("/dashboard/user/view-profile");
      } else {
        toast.error(result?.message, { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      toast.error("An error occurred while updating profile.", {
        id: toastId,
        duration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 box-shadow mb-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Primary phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Secondary phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="pb-6">
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address.village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village</FormLabel>
                    <FormControl>
                      <Input placeholder="Village name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="District" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.subDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub-district</FormLabel>
                    <FormControl>
                      <Input placeholder="Sub-district" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.post"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Office</FormLabel>
                    <FormControl>
                      <Input placeholder="Post office" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.postCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            {form.formState.isSubmitting ? <LoadingButton /> : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProfileForm;
