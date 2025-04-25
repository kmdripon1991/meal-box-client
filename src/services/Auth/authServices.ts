"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { isTokenExpired } from "@/lib/varifyToken";
import { jwtDecode } from "jwt-decode";

export const signupUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    console.log(result);
    // console.log(result);
    // if (result.success) {
    //   (await cookies()).set("access-token", result?.data?.accessToken);
    // }
    return result;
  } catch (error: any) {
    return Error(error);
    // console.log("Here is error");
  }
};

export const loginUser = async (loginInfo: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const result = await res.json();
    console.log(result);
    if (result.success) {
      (await cookies()).set("access-token", result?.data?.accessToken);
      (await cookies()).set("refresh-token", result?.data?.refreshToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("access-token")?.value;
  console.log(accessToken);
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};
export const forgetPassword = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
export const resetPassword = async (data: FieldValues, sortToken: string) => {
  (await cookies()).set("access-token", sortToken);
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
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
// export const getMe = async () => {
//   const cookyStore = await cookies();
//   let token = cookyStore.get("access-token")!.value;
//   if (!token || (await isTokenExpired(token))) {
//     const { data } = await getNewToken();
//     token = data.accessToken;
//     cookyStore.set("access-token", token);
//   }
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });

//   const accessToken = (await cookies()).get("access-token")?.value;
//   console.log(accessToken);
//   let decodedData = null;

//   if (accessToken) {
//     decodedData = await jwtDecode(accessToken);
//     return decodedData;
//   } else {
//     return null;
//   }
// }catch(error:any){
//   return Error(error)
// }}

export const updateProfile = async (payload: any) => {
  const cookieStore = await cookies();
  let token = cookieStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookieStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/update-user`,
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

export const updatePassword = async (payload: any) => {
  const cookieStore = await cookies();
  let token = cookieStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookieStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
      {
        method: "POST",
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

export const getNewToken = async () => {
  try {
    // const res = await fetch(
    //   "http://localhost:5000/auth/refresh-token",
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: (await cookies()).get("refresh-Token")!.value,
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const logout = async () => {
  (await cookies()).delete("access-token");
  (await cookies()).delete("refresh-token");
};

export const getMe = async () => {
  const cookieStore = await cookies();
  let token = cookieStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookieStore.set("access-token", token);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log(result);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const UploadImage = async (data: FormData) => {
  const cookieStore = await cookies();
  let token = cookieStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const cookie = await getNewToken();
    console.log("cookie data", cookie);
    token = cookie?.accessToken;
    cookieStore.set("access-token", token);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/upload`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      // credentials: "include",
      body: data,
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error(error);
    return Error(error);
  }
};

export const getAllUser = async () => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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
export const changeUserStatus = async (blockUserData: any) => {
  const cookyStore = await cookies();
  let token = cookyStore.get("access-token")!.value;
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data.accessToken;
    cookyStore.set("access-token", token);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change-user-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(blockUserData),
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
