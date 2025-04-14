"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/signup";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const form = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const submit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className=" border-2 my-10 shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Mealbox Registration
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Please fill out the form below to create your Mealbox account and get
        started with delicious meals delivered to your doorstep.
      </p>

      <form className="my-8" onSubmit={form.handleSubmit(submit)}>
        <div>
          <h3 className="text-2xl font-semibold pb-2">General Information</h3>
          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            {...form.register("fullname")}
            placeholder="Enter your fullname"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            {...form.register("email")}
            placeholder="projectmayhem@fc.com"
            type="email"
          />
        </LabelInputContainer>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="phone">Mobile</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="Enter your mobile"
              type="tel"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="secondaryPhone">Secondary Mobile</Label>
            <Input
              id="secondaryPhone"
              {...form.register("secondaryPhone")}
              placeholder="Secondary mobile number"
              type="tel"
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" {...form.register("dob")} type="date" />
        </LabelInputContainer>

        {/* Gender Selection */}
        <div className="py-4">
          <Label>Gender</Label>
          <RadioGroup
            defaultValue="male"
            className="flex pt-2"
            {...form.register("gender")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="gender-male" />
              <Label htmlFor="gender-male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="gender-female" />
              <Label htmlFor="gender-female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="gender-other" />
              <Label htmlFor="gender-other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Address Section */}
        <div className="pb-4">
          <h3 className="text-2xl font-semibold pb-2">Address Information</h3>
          <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="village">Village</Label>
          <Input
            id="village"
            {...form.register("village")}
            placeholder="Enter your village"
            type="text"
          />
        </LabelInputContainer>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              {...form.register("district")}
              placeholder="Enter your district"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="subDistrict">Sub-district</Label>
            <Input
              id="subDistrict"
              {...form.register("subDistrict")}
              placeholder="Enter your sub-district"
              type="text"
            />
          </LabelInputContainer>
        </div>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="post">Post</Label>
            <Input
              id="post"
              {...form.register("post")}
              placeholder="Enter your post"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="postCode">Post Code</Label>
            <Input
              id="postCode"
              {...form.register("postCode")}
              placeholder="Enter your post code"
              type="number"
            />
          </LabelInputContainer>
        </div>
        <h3 className="text-2xl font-semibold pb-2">Address Information</h3>
        <div className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        {/* Password */}
        <LabelInputContainer className="my-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            {...form.register("password")}
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            {...form.register("confirmPassword")}
            placeholder="Re-enter your password"
            type={showPassword ? "text" : "password"}
          />
        </LabelInputContainer>

        <div className="pb-5 -mt-2.5">
          <Checkbox onClick={() => setShowPassword(!showPassword)} />
          <span className="ml-2.5">
            {showPassword ? "Hide Password" : "Show Password"}
          </span>
        </div>

        <Button className="w-full">Sign up &rarr;</Button>
        {/* <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button> */}
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
