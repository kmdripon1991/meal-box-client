/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { weeklyMenuSchema } from "../menu.zodValidationSchema";
import { updateMyMenu } from "@/services/Menu/menuServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TMealPlan } from "@/types";

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

export default function UpdateMenu({ data }: { data: TMealPlan }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeeklyMenuType>({
    resolver: zodResolver(weeklyMenuSchema),
    defaultValues: {
      meals: days.map((day) => {
        // Find the corresponding day data from the props
        const dayData = data.meals.find((meal) => meal.day === day);

        return {
          day,
          morning: {
            menu: dayData?.morning?.menu || "",
            price: dayData?.morning?.price || 0,
          },
          evening: {
            menu: dayData?.evening?.menu || "",
            price: dayData?.evening?.price || 0,
          },
          night: {
            menu: dayData?.night?.menu || "",
            price: dayData?.night?.price || 0,
          },
        };
      }),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "meals",
  });
  const router = useRouter();
  const onSubmit = async (data: WeeklyMenuType) => {
    const toastId = toast.loading("Update menu ...........", {
      duration: 2000,
    });

    try {
      const result = await updateMyMenu(data);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/menu/my-menu");
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error("An error occurred while updating menu.", {
        id: toastId,
        duration: 2000,
      });
      console.error(error);
    }
  };

  return (
    <div className="my-10 mx-5">
      <div className="max-w-2xl box-shadow  mx-auto border p-4 rounded-md shadow-sm">
        <div className="flex gap-2.5 items-center">
          <img className="w-20" src="/mealbox.png" alt="Mealbox logo" />
          <div>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
              Weekly Update Menu Submission
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
              Please update the meal plan for each day of the week. Include menu
              items and pricing for morning, evening, and night meals.
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

          <Button type="submit" className="w-full">
            Update Weekly Menu
          </Button>
        </form>
      </div>
    </div>
  );
}

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-sm mt-1">{msg}</p> : null;
