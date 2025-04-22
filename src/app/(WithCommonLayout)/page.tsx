import { SixCard } from "@/components/home/SixCard";
import Slider from "@/components/home/Slider";
import { Testimonial } from "@/components/home/Testimonial";
import { getSixMenus } from "@/services/Menu/menuServices";
import { getAllProvider } from "@/services/Provider/providerSurvices";
import React from "react";

const HomePage = async () => {
  const { data } = await getSixMenus();
  const mealProvider = await getAllProvider();

  return (
    <>
      <div>
        <Slider sliderData={data} />
      </div>
      <div className="max-w-5xl py-10 mx-auto px-5">
        <SixCard data={data} />
        <Testimonial mealProvider={mealProvider} />
      </div>
    </>
  );
};

export default HomePage;
