import { AllMenuCard } from "@/components/modules/menu/allMenu/AllMenuCards";
import { getAllMenus } from "@/services/Menu/menuServices";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "All Menu",
  description:
    "Our restaurant offers a cozy and welcoming atmosphere where guests can enjoy delicious, freshly prepared meals. We take pride in using quality ingredients and serving a diverse menu that caters to all tastes. Whether you're here for a casual lunch or a special dinner, we ensure a memorable dining experience.",
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const data = await getAllMenus(page);

  return (
    <div className="max-w-5xl py-10 mx-auto px-5">
      <AllMenuCard data={data} />
    </div>
  );
};

export default page;
