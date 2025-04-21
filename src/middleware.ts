import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/Auth/authServices";

const authRoutes = ["/login", "/signup"];
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/api/auth",
  "/dashboard/menu/all-menu",
];
const mealProviderRoute = [
  "/dashboard/order/meal-provider-order",
  "/dashboard",
  "/dashboard/menu/create-menu",
  "/dashboard/menu/my-menu",
  "/dashboard/menu/update-menu",
  "/dashboard/meal-provider/my-meal-provider",
  "/dashboard/meal-provider/update-meal-provider",
  "/dashboard/order/meal-provider-order",
  "/dashboard/menu/all-menu",
];
const customerRoute = [
  "/create-meal-provider",
  "/dashboard",
  "/dashboard/order/my-order",
  "/dashboard/menu/all-menu",
  "/dashboard/menu/all-menu",
];
const profileRouter = [
  "/dashboard/user/view-profile",
  "/dashboard/user/update-profile",
  "/dashboard/user/change-password",
];

const staticPaths = ["/_next/", "/favicon.ico", "/assets/"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // 1. First skip all static files and API routes
  if (
    staticPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Then handle public routes
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/details-menu/")
  ) {
    return NextResponse.next();
  }

  // 3. Finally check authentication
  const userInfo = await getCurrentUser();
  console.log(userInfo);
  //   const userInfo = null;

  if (!userInfo) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }
  if (!userInfo && pathname.startsWith("/details-menu/")) {
    new URL(`/login?redirectPath=${pathname}`, request.url);
  }
  if (userInfo.role === "mealProvider") {
    if (
      mealProviderRoute.includes(pathname) ||
      profileRouter.includes(pathname) ||
      pathname.startsWith("dashboard/order/details-menu/")
    ) {
      // ,meal provider route access when logged in
      return NextResponse.next();
    }
    // else {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }
  }
  if (userInfo.role === "customer") {
    if (
      customerRoute.includes(pathname) ||
      profileRouter.includes(pathname) ||
      pathname.startsWith("dashboard/order/details-menu/")
    ) {
      // customer route access when logged in
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (authRoutes.includes(pathname)) {
    // Prevent auth route access when logged in
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/create-meal-provider",
    "/dashboard",
    "/dashboard/menu/create-menu",
    "/dashboard/menu/my-menu",
    "/dashboard/menu/update-menu",
    "/dashboard/order/my-order",
    "/dashboard/order/meal-provider-order",
    "/dashboard/meal-provider/my-meal-provider",
    "/dashboard/meal-provider/update-meal-provider",
    "/dashboard/user/view-profile",
    "/dashboard/user/update-profile",
    "/dashboard/user/change-password",

    /*
     * Match all paths except:
     * - API routes
     * - Static files
     * - Auth routes (they have their own logic)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
