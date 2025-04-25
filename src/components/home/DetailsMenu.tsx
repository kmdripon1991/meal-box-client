import React from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGlobe,
  FaPhone,
  FaClock,
  FaCalendarAlt,
  FaWallet,
  FaMapMarkerAlt,
  FaStore,
  FaUser,
  FaUtensils,
  FaMoneyBillWave,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

interface Address {
  village: string;
  district: string;
  subDistrict: string;
  post: string;
  postCode: string;
}

interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

interface OperatingHours {
  open: string;
  close: string;
  daysOpen: string[];
}

interface shopId {
  shopName: string;
  ownerName: string;
  shopLogo: string;
  shopAddress: string;
  phoneNumber: string;
  customerServiceContact: string;
  establishedYear: number;
  operatingHours: OperatingHours;
  paymentMethods: string[];
  productCategories: string[];
  socialMediaLinks: SocialMediaLinks;
  website: string;
  address: Address;
}

interface MealTime {
  menu?: string;
  price?: number;
  _id?: string;
}

interface DayMenu {
  day?: string;
  morning?: MealTime;
  evening?: MealTime;
  night?: MealTime;
  _id?: string;
}

interface MenuData {
  _id: string;
  meals?: DayMenu[];
  menuImage?: string;
  shopId?: shopId;
}

const DetailsMenu: React.FC<{ menu?: MenuData }> = ({ menu }) => {
  console.log(menu);
  if (!menu) return <div className="text-center py-10">Loading menu...</div>;
  console.log(menu);
  return (
    <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      {/* Shop Information Section */}

      {/* Menu Image */}
      {menu?.menuImage && (
        <div className="mb-10 relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={menu.menuImage}
            alt={`${menu?.shopId?.shopName || "Shop"} menu`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">
              <FaUtensils className="inline mr-3" />
              Our Menu
            </h2>
          </div>
        </div>
      )}

      {/* Weekly Menu */}
      <div className="space-y-6">
        {menu?.meals?.map((dayMenu) => (
          <div
            key={dayMenu?._id || Math.random().toString()}
            className="bg-white box-shadow rounded-lg shadow-md overflow-hidden"
          >
            {/* Day Header */}
            <div className="bg-gradient-to-r from-[#424242] to-[#0c0101] text-white px-6 py-4">
              <h3 className="text-xl font-semibold flex items-center">
                <FaCalendarAlt className="mr-2" />
                {dayMenu?.day || "Day"}
              </h3>
            </div>

            {/* Meal Times */}
            <div className="divide-y divide-gray-200">
              {/* Morning */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-4">
                      <IoMdTime className="text-yellow-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Morning
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {dayMenu?.morning?.menu || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 flex items-center">
                    <FaMoneyBillWave className="mr-1 text-green-500" />$
                    {dayMenu?.morning?.price?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>

              {/* Evening */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-2 rounded-full mr-4">
                      <IoMdTime className="text-orange-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Evening
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {dayMenu?.evening?.menu || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 flex items-center">
                    <FaMoneyBillWave className="mr-1 text-green-500" />$
                    {dayMenu?.evening?.price?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>

              {/* Night */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-4">
                      <IoMdTime className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Night
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {dayMenu?.night?.menu || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 flex items-center">
                    <FaMoneyBillWave className="mr-1 text-green-500" />$
                    {dayMenu?.night?.price?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-10 max-w-[200px] mx-auto ">
        <Link href={`/dashboard/order/details-menu/${menu._id}`}>
          <Button className="w-full py-6">
            <ShoppingCart className="w-4 h-4 mr-1" />
            Order now
          </Button>
        </Link>
      </div>
      <div className="bg-white mt-10 box-shadow rounded-xl shadow-md overflow-hidden mb-10">
        <h2 className="text-2xl md:text-3xl text-center font-bold py-5 border-b-4 border-[#0c0101]">
          Shop Information
        </h2>
        <div className="md:flex">
          {/* Shop Logo */}
          <div className="md:w-1/3 p-6 flex justify-center items-center bg-gray-50">
            {menu?.shopId?.shopLogo && (
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={menu.shopId.shopLogo}
                  alt={menu.shopId.shopName || "Shop logo"}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Shop Details */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <FaStore className="mr-2 text-blue-600" />
              {menu?.shopId?.shopName}
            </h1>
            <p className="text-lg text-gray-600 mb-4 flex items-center">
              <FaUser className="mr-2 text-green-600" />
              Owned by {menu?.shopId?.ownerName} | Established{" "}
              {menu?.shopId?.establishedYear}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                  <FaPhone className="mr-1" /> Contact
                </h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-900 flex items-center">
                    <span className="w-5 mr-2">
                      <FaPhone className="text-blue-500" />
                    </span>
                    {menu?.shopId?.phoneNumber}
                  </p>
                  <p className="text-gray-900 flex items-center">
                    <span className="w-5 mr-2">
                      <FaPhone className="text-green-500" />
                    </span>
                    {menu?.shopId?.customerServiceContact}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> Address
                </h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-900 flex">
                    <span className="w-5 mr-2">
                      <FaMapMarkerAlt className="text-red-500 mt-1" />
                    </span>
                    {menu?.shopId?.shopAddress},{" "}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                  <IoMdTime className="mr-1" /> Hours
                </h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-900 flex items-center">
                    <span className="w-5 mr-2">
                      <FaClock className="text-yellow-500" />
                    </span>
                    {menu?.shopId?.operatingHours?.open} -{" "}
                    {menu?.shopId?.operatingHours?.close}
                  </p>
                  <p className="text-gray-900 flex items-center">
                    <span className="w-5 mr-2">
                      <FaCalendarAlt className="text-purple-500" />
                    </span>
                    {menu?.shopId?.operatingHours?.daysOpen?.join(", ")}
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                  <MdPayment className="mr-1" /> Payment Methods
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {menu?.shopId?.paymentMethods?.map((method, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <FaWallet className="mr-1" /> {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {menu?.shopId?.socialMediaLinks?.facebook && (
                <a
                  href={menu.shopId.socialMediaLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="h-6 w-6" />
                </a>
              )}
              {menu?.shopId?.socialMediaLinks?.instagram && (
                <a
                  href={menu.shopId.socialMediaLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
              )}
              {menu?.shopId?.socialMediaLinks?.twitter && (
                <a
                  href={menu.shopId.socialMediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
              )}
              {menu?.shopId?.socialMediaLinks?.linkedin && (
                <a
                  href={menu.shopId.socialMediaLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
              )}
              {menu?.shopId?.website && (
                <a
                  href={menu.shopId.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                  aria-label="Website"
                >
                  <FaGlobe className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {(!menu.meals || menu.meals.length === 0) && (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <FaUtensils className="mx-auto text-4xl text-gray-400 mb-3" />
          <p className="text-gray-500">No menu available for this shop yet.</p>
        </div>
      )}
    </div>
  );
};

export default DetailsMenu;
