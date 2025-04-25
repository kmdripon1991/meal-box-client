"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isTokenExpired } from "@/lib/varifyToken";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { getNewToken } from "../Auth/authServices";

// 1. Select & Customize Meal Plans
export const createOrder = async (data: FieldValues, id: string) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/create-order/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

// get my order
export const getMyOrder = async (page?: string) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/my-order?page=${page}&limit=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleOrder = async (id: string) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
// get my order
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMealProviderOrder = async (page?: string, sort?: string) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order?limit=5&page=${page}&sort=${sort}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// 3. Track Orders
export const getOrdersByCustomer = async () => {};

// 4. Manage Preferences
export const updatePreferences = async () => {};
