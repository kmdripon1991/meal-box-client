"use server";

import { isTokenExpired } from "@/lib/varifyToken";
import { cookies } from "next/headers";
import { getNewToken } from "../Auth/authServices";

export const createMenuByProvider = async (MenuData: FormData) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/create-menu`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: MenuData,
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllMenus = async (page?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu?page=${page}&limit=6`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          // Authorization: (await cookies()).get("access-token")!.value,
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSixMenus = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu?limit=6`, {
      method: "GET",
      // headers: {
      //   "Content-type": "application/json",
      //   // Authorization: (await cookies()).get("access-token")!.value,
      // },
    });
    // console.log(res.json());
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyMenu = async () => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/my-menu`, {
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

export const updateMyMenu = async (payload: any) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/update-menu`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleMenu = async (menuId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const menuDelete = async (id: string) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/delete-menu/${id}`,
      {
        method: "DELETE",
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
