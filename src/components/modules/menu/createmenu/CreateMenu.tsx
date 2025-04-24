/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { weeklyMenuSchema } from "../menu.zodValidationSchema";
import Image from "next/image";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";
import { createMenuByProvider } from "@/services/Menu/menuServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/ui/Loading/Loader";

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
type MealTime = "morning" | "evening" | "night";
type WeeklyMenuType = z.infer<typeof weeklyMenuSchema>;

export default function MenuAddForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WeeklyMenuType>({
    resolver: zodResolver(weeklyMenuSchema),
    defaultValues: {
      meals: days.map((day) => ({
        day,
        morning: { menu: "", price: 0 },
        evening: { menu: "", price: 0 },
        night: { menu: "", price: 0 },
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "meals",
  });

  const handleMenuFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const onSubmit = async (data: WeeklyMenuType) => {
    const toastId = toast.loading("Menu creating.......", { duration: 3000 });
    try {
      const formData = new FormData();
      const menuPayload = {
        meals: data.meals.map((day) => ({
          day: day.day,
          morning: {
            menu: day.morning.menu,
            price: Number(day.morning.price),
          },
          evening: {
            menu: day.evening.menu,
            price: Number(day.evening.price),
          },
          night: {
            menu: day.night.menu,
            price: Number(day.night.price),
          },
        })),
      };

      formData.append("data", JSON.stringify(menuPayload));
      if (files.length > 0) {
        formData.append("file", files[0]);
      } else {
        throw new Error("Menu image is required");
      }
      const result = await createMenuByProvider(formData);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000, id: toastId });
        router.push("/dashboard/menu/my-menu");
      } else {
        toast.error(result?.message, { duration: 3000, id: toastId });
      }
    } catch (error: any) {
      return Error(error);
    }
  };

  return (
    <div className="my-10 mx-5">
      <div className="max-w-2xl box-shadow  mx-auto border p-4 rounded-md shadow-sm">
        <div className="flex gap-2.5 items-center">
          {/* <img className="w-20" src="/mealbox.png" alt="Mealbox logo" /> */}
          <Image
            src="/mealbox.png"
            alt="Mealbox logo"
            width={80}
            height={80}
            className="w-20"
          />
          <div>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
              Weekly Menu Submission
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
              Please fill out the meal plan for each day of the week. Include
              menu items and pricing for morning, evening, and night meals.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          {fields.map((field, index) => (
            <div key={field.id} className="">
              <div className="my-1 h-[1px] w-full  bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
              <h3 className="text-xl font-semibold text-center">{field.day}</h3>
              <div className="my-2 h-[1px] w-full mb-6 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
              {(["morning", "evening", "night"] as MealTime[]).map(
                (mealTime) => (
                  <div
                    key={mealTime}
                    className="mb-6 grid grid-cols-1 -mt-4 lg:grid-cols-2 gap-3 items-center"
                  >
                    <div>
                      <h4 className="font-medium  capitalize ">{mealTime}</h4>

                      <Label
                        className="py-2 text-[12px]"
                        htmlFor={`meals.${index}.${mealTime}.menu`}
                      >
                        Menu Item
                      </Label>
                      <Input
                        {...register(`meals.${index}.${mealTime}.menu`)}
                        placeholder="e.g. Chicken Curry"
                      />
                      <ErrorMsg
                        msg={
                          errors.meals?.[index]?.[
                            mealTime as "morning" | "evening" | "night"
                          ]?.menu?.message
                        }
                      />
                    </div>

                    <div className="mt-5.5">
                      <Label
                        className=" pb-2 lg:-mt-0  text-[12px] -mt-5 lg:py-2"
                        htmlFor={`meals.${index}.${mealTime}.price`}
                      >
                        Price
                      </Label>
                      <Input
                        type="number"
                        {...register(`meals.${index}.${mealTime}.price`, {
                          valueAsNumber: true,
                        })}
                        placeholder="e.g. 120"
                      />
                      <ErrorMsg
                        msg={
                          errors.meals?.[index]?.[
                            mealTime as "morning" | "evening" | "night"
                          ]?.price?.message
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
          <div className="w-full my-5 max-w-4xl mx-auto min-h-10 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleMenuFileUpload} />
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            {isSubmitting ? <LoadingButton /> : "Submit Weekly Menu"}
          </Button>
        </form>
      </div>
    </div>
  );
}

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-sm mt-1">{msg}</p> : null;
