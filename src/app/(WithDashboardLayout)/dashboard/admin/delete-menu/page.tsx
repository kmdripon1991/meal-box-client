import DeleteMenu from "@/components/admin/DeleteMenu";
import { getAllMenus } from "@/services/Menu/menuServices";
import React from "react";

const DeleteMenuPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getAllMenus(page);
  return <DeleteMenu menus={data}></DeleteMenu>;
};

export default DeleteMenuPage;
