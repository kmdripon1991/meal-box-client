export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role?: "customer" | "meal-provider" | "admin" | undefined;
  iat?: number;
  exp?: number;
}
export type UserPayload = {
  id: string;
  emailOrPhone: string;
  role: "mealProvider" | string; // you can narrow or expand roles here
  iat: number;
  exp: number;
};

export type TAddress = {
  village: string;
  post: string;
  postCode: string;
  subDistrict: string;
  district: string;
};

export type TUser = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  secondaryPhone: string;
  gender: "male" | "female" | "other"; // adjust as needed
  dateOfBirth: string; // ISO format string; convert to Date if needed
  password: string;
  address: TAddress;
  role: "customer" | "admin" | "mealProvider"; // add more roles if needed
  isShop: boolean;
  isBlock: boolean;
  profileImage: string;
  isDelete: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
};
