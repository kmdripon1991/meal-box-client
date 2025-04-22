/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "swiper/css";

import "swiper/css/pagination";

// add auto play cod
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { Button } from "../ui/button";
import { DotIcon, View } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

// import required modules
// import { Pagination } from 'swiper/modules';

export default function Slider({ sliderData }: { sliderData: any }) {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        // add auto aplay cod
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData?.map((menu: any, index: string) => (
          <SwiperSlide key={index}>
            <div className="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-900 bg-gray-800 p-6">
              <div className="grid md:grid-cols-2 items-center gap-10 max-w-5xl max-md:max-w-md mx-auto">
                <div className="h-screen md:h-[400px] lg:h-[500px]">
                  <img
                    src={menu.menuImage}
                    className="w-full h-full rounded-md object-cover"
                  />
                </div>
                <div className="max-md:text-center">
                  <h1 className="text-2xl md:text-4xl text-white mb-5 ml-1.5 font-bold">
                    Our Features
                  </h1>
                  <ul className="list-disc pl-5 text-base text-white space-y-2">
                    <li>Delicious and high-quality food</li>
                    <li>Clean and comfortable dining environment</li>
                    <li>Fast and friendly customer service</li>
                    <li>Home delivery available</li>
                    <li>Online ordering and payment system</li>
                  </ul>

                  <p className="text-white mt-6 text-sm leading-relaxed flex gap-3.5">
                    {menu?.shopId?.productCategories?.[0] && (
                      <span className="flex items-center gap-1">
                        <DotIcon />
                        {menu.shopId.productCategories[0]}
                      </span>
                    )}
                    {menu?.shopId?.productCategories?.[1] && (
                      <span className="flex items-center gap-1">
                        <DotIcon />
                        {menu.shopId.productCategories[1]}
                      </span>
                    )}
                    {menu?.shopId?.productCategories?.[2] && (
                      <span className="flex items-center gap-1">
                        <DotIcon />
                        {menu.shopId.productCategories[2]}
                      </span>
                    )}
                    {menu?.shopId?.productCategories?.[3] && (
                      <span className="flex items-center gap-1">
                        <DotIcon />
                        {menu.shopId.productCategories[3]}
                      </span>
                    )}
                    {menu?.shopId?.productCategories?.[4] && (
                      <span className="flex items-center gap-1">
                        <DotIcon />
                        {menu.shopId.productCategories[4]}
                      </span>
                    )}
                    {menu?.shopId?.productCategories?.[5] && (
                      <span className="flex items-center gap-1">
                        <DotIcon />
                        {menu.shopId.productCategories[5]}
                      </span>
                    )}
                    {menu?.shopId?.productCategories?.[6] && (
                      <span className="flex items-center gap-1">
                        <DotIcon />
                        {menu.shopId.productCategories[6]}
                      </span>
                    )}
                    {menu?.shopId?.productCategories?.[7] && (
                      <span className="flex items-center gap-1">
                        <DotIcon />
                        {menu.shopId.productCategories[7]}
                      </span>
                    )}
                  </p>
                  <div className="flex gap-4 justify-center mt-5">
                    {menu?.shopId?.socialLinks?.facebook && (
                      <a
                        href={menu?.shopId?.socialLinks?.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="w-6 h-6 text-blue-600 hover:text-blue-800 transition-colors" />
                      </a>
                    )}
                    {menu?.shopId?.socialLinks?.instagram && (
                      <a
                        href={menu?.shopId?.socialLinks?.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition-colors" />
                      </a>
                    )}
                    {menu?.shopId?.socialLinks?.linkedin && (
                      <a
                        href={menu?.shopId?.socialLinks?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="w-6 h-6 text-blue-700 hover:text-blue-900 transition-colors" />
                      </a>
                    )}
                    {menu?.shopId?.socialLinks?.twitter && (
                      <a
                        href={menu?.shopId?.socialLinks?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="w-6 h-6 text-sky-500 hover:text-sky-700 transition-colors" />
                      </a>
                    )}
                  </div>
                  <Link href={`/details-menu/${menu._id}`}>
                    <Button className="px-5 py-2.5 mt-6 ml-3 font-medium ">
                      Details Menu <View />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
