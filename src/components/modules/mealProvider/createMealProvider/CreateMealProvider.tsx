/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { mealProviderSchema } from "./mealProviderValidaction";
import { toast } from "sonner";
import { createProvider } from "@/services/Provider/providerSurvices";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingButton from "@/components/ui/Loading/Loader";
import { logout } from "@/services/Auth/authServices";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const PAYMENT_METHODS = ["Cash", "Card", "Mobile Payment"] as const;

// Define Zod schema

// Infer the type from the schema
type FormValues = z.infer<typeof mealProviderSchema>;

const CreateMealProviderForm = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(mealProviderSchema),
    defaultValues: {
      shopName: "",
      shopAddress: "",
      phoneNumber: "",
      website: "",
      ownerName: "",
      establishedYear: new Date().getFullYear(),
      productCategories: [{ value: "" }],
      socialMediaLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
      },
      operatingHours: {
        open: "",
        close: "",
        daysOpen: [],
      },
      paymentMethods: [],
      customerServiceContact: "",
    },
  });

  const {
    append: appendProductCategory,
    fields: productCategories,
    remove: removeProductCategory,
  } = useFieldArray({
    control: form.control,
    name: "productCategories",
  });

  const addProductCategory = () => {
    appendProductCategory({ value: "" });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading("Meal Provider Creating.........", {
      duration: 3000,
    });
    const payloadData = {
      shopName: data.shopName,
      ownerName: data.ownerName,
      shopAddress: data.shopAddress,
      phoneNumber: data.phoneNumber,
      customerServiceContact: data.customerServiceContact,
      website: data.website,
      establishedYear: Number(data.establishedYear),
      socialMediaLinks: {
        facebook: data.socialMediaLinks.facebook,
        instagram: data.socialMediaLinks.instagram,
        twitter: data.socialMediaLinks.twitter,
        linkedin: data.socialMediaLinks.linkedin,
      },
      operatingHours: {
        open: data.operatingHours.open,
        close: data.operatingHours.close,

        daysOpen: Array.isArray(data.operatingHours?.daysOpen)
          ? data.operatingHours.daysOpen.map((item) =>
              typeof item === "string"
                ? item
                : (item as { label?: string; value?: string }).label ||
                  (item as { label?: string; value?: string }).value
            )
          : [],
      },

      paymentMethods: Array.isArray(data.paymentMethods)
        ? data.paymentMethods.map((item) =>
            typeof item === "string"
              ? item
              : (item as { label?: string; value?: string }).label ||
                (item as { label?: string; value?: string }).value
          )
        : [],

      productCategories: Array.isArray(data.productCategories)
        ? data.productCategories.map((item) =>
            typeof item === "string" ? item : item.value
          )
        : [],
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payloadData));
      if (files.length > 0) {
        formData.append("file", files[0]);
      } else {
        throw new Error("Provider image is required");
      }
      const result = await createProvider(formData);
      if (result?.success) {
        //  setIsShop(true);
        toast.success(result?.message, { duration: 3000, id: toastId });
        await logout();
        router.push("/login");
      } else {
        toast.error(result?.message, { duration: 3000, id: toastId });
      }
    } catch (error: any) {
      return Error(error);
    }
  };

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  return (
    <section className="px-5 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg p-6 shadow-md">
          <div className="flex gap-2.5 items-center pb-5">
            <Image
              src="/mealbox.png"
              alt="Mealbox Logo"
              width={80}
              height={80}
              className="w-20 h-auto"
              priority
            />
            <div>
              <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                Create Your Mealbox Account
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
                Please enter your credentials to access your account and start
                enjoying delicious meals delivered to your doorstep.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Shop Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="shopName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop Name*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter shop name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter owner name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="shopAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Address*</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter shop address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerServiceContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Service Contact*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Enter contact number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com"
                          type="url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="establishedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Established Year*</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          placeholder="Enter year"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="socialMediaLinks.facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="url"
                            placeholder="https://facebook.com/yourpage"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialMediaLinks.instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://instagram.com/yourprofile"
                            type="url"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialMediaLinks.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://twitter.com/yourprofile"
                            type="url"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialMediaLinks.linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://linkedin.com/company/yourcompany"
                            type="url"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Operating Hours*</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="operatingHours.open"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opening Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="operatingHours.close"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Days Open*</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <FormField
                        key={day}
                        control={form.control}
                        name="operatingHours.daysOpen"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={day}
                              className="flex items-center space-x-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(day)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, day])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== day
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {day}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage>
                    {form.formState.errors.operatingHours?.daysOpen?.message}
                  </FormMessage>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Methods*</h3>
                <div className="flex flex-wrap gap-4">
                  {PAYMENT_METHODS.map((method) => (
                    <FormField
                      key={method}
                      control={form.control}
                      name="paymentMethods"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={method}
                            className="flex items-center space-x-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, method])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== method
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {method}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage>
                  {form.formState.errors.paymentMethods?.message}
                </FormMessage>
              </div>

              {/* Product Categories */}
              <div className="flex justify-between">
                <h2 className="text-xl md:text-2xl font-bold">
                  Product Categories
                </h2>
                <Button
                  type="button"
                  onClick={addProductCategory}
                  variant={"outline"}
                >
                  <CircleFadingPlus />
                </Button>
              </div>
              <div className="-mt-2 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

              <div className="space-y-3">
                {productCategories.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`productCategories.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Category {index + 1}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter category name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeProductCategory(index)}
                        className="mt-7"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Shop Logo Upload */}
              <div className="w-full my-5 max-w-4xl mx-auto min-h-10 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
              </div>

              <Button type="submit" className="w-full cursor-pointer" size="lg">
                {form.formState.isSubmitting ? (
                  <LoadingButton />
                ) : (
                  "Create Meal Provider"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default CreateMealProviderForm;
