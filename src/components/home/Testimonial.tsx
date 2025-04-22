/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaStar,
  FaTwitter,
} from "react-icons/fa";

export const Testimonial = ({ mealProvider }: { mealProvider: any }) => {
  const mealProviderData = mealProvider?.data?.data || [];

  const renderStars = (rating: number) => {
    const validRating = Math.min(5, Math.max(0, Number(rating) || 0));
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 >= 0.5;

    return (
      <div className="flex justify-center mb-4">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500 mx-0.5" />
        ))}
        {hasHalfStar && (
          <div className="relative mx-0.5">
            <FaStar className="text-gray-300" />
            <FaStar className="text-yellow-500 absolute top-0 left-0 w-1/2 overflow-hidden" />
          </div>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300 mx-0.5" />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-4xl text-center  font-bold">
          Testimonial Section
        </h1>
        <div className="max-w-md mx-auto border-b-2 mt-4  border-[#424242]"></div>
      </div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {mealProviderData.map((provider: any, index: number) => (
          <SwiperSlide key={index}>
            <section className="bg-white dark:bg-gray-900">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                  {renderStars(provider.rating)}

                  <blockquote>
                    <p className="text-xl italic text-gray-600 dark:text-gray-300">
                      This online shop provides exceptional service! Their
                      products always arrive on time and exactly as described.
                      The customer support team is responsive and helpful. I
                      particularly appreciate their easy return policy and
                      quality guarantees. Highly recommended for hassle-free
                      online shopping!
                    </p>
                  </blockquote>

                  <figcaption className="flex items-center justify-center mt-6 space-x-3">
                    {provider.shopLogo && (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={provider.shopLogo}
                        alt="profile picture"
                      />
                    )}
                    <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                      <div className="pr-3 font-medium text-gray-900 dark:text-white">
                        {provider.authorShopId?.fullName || "Anonymous"}
                      </div>
                      <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                        {provider.shopName
                          ? `CEO at ${provider.shopName}`
                          : "Verified Customer"}
                      </div>
                    </div>
                  </figcaption>

                  <div className="flex gap-4 justify-center mt-5">
                    {provider.socialLinks?.facebook && (
                      <a
                        href={provider.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="w-6 h-6 text-blue-600 hover:text-blue-800 transition-colors" />
                      </a>
                    )}
                    {provider.socialLinks?.instagram && (
                      <a
                        href={provider.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition-colors" />
                      </a>
                    )}
                    {provider.socialLinks?.linkedin && (
                      <a
                        href={provider.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="w-6 h-6 text-blue-700 hover:text-blue-900 transition-colors" />
                      </a>
                    )}
                    {provider.socialLinks?.twitter && (
                      <a
                        href={provider.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="w-6 h-6 text-sky-500 hover:text-sky-700 transition-colors" />
                      </a>
                    )}
                  </div>
                </figure>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
