import * as z from "zod";

export const registrationSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(11, "Phone must be at least 11 digits"),
    secondaryPhone: z.string().min(11, "Phone must be at least 11 digits"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Gender is required",
    }),
    address: z.object({
      village: z.string().min(1, "Village is required"),
      district: z.string().min(1, "District is required"),
      subDistrict: z.string().min(1, "Sub-district is required"),
      post: z.string().min(1, "Post is required"),
      postCode: z.string().min(1, "Post code is required"),
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
