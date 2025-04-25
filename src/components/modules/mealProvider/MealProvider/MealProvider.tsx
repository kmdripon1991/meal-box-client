/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsShop } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhoneAlt,
  FaGlobe,
  FaCalendarAlt,
  FaUserTie,
  FaStar,
} from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

const ShopInfoCard = ({ data }: { data: any }) => {
  return (
    <section className="mx-5 mb-5 box-shadow rounded-md">
      <div className="bg-gradient-to-r from-[#424242] rounded-t-md to-[#424242d3] h-32 p-6 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="h-[105px] w-28 rounded-full border-2 border-white bg-white flex items-center justify-center shadow-lg">
            <Image
              src={data?.shopLogo}
              alt="Shop Logo"
              width={150}
              height={50}
              style={{ width: "150px", height: "100px", borderRadius: "100%" }}
              // OR with Tailwind:
              // className="w-[150px] h-[50px]"
            />
          </div>
        </div>
      </div>
      {/* <div className="bg-indigo-600">
        <div className="flex  items-center gap-5 mb-6">
          <Image
            src={data?.shopLogo}
            alt="Shop Logo"
            width={150}
            height={50}
            style={{ width: "100px", height: "100px", borderRadius: "100%" }}
            // OR with Tailwind:
            // className="w-[150px] h-[50px]"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {data?.shopName}
            </h2>
            <p className="text-gray-500">{data?.shopAddress}</p>
          </div>
        </div>
      </div> */}
      <div className="max-w-6xl  mx-auto bg-white rounded-2xl  shadow-lg p-8 sm:p-10 md:p-12 mb-10">
        <div className="py-5 border-[#424242] border-b-2">
          <h1 className="text-2xl font-bold flex gap-2 items-center text-gray-900">
            <BsShop /> {data?.shopName}
          </h1>
          <div className="flex items-center mt-2">
            <IoLocation className="text-2xl" />
            <span className="ml-2 text-sm font-medium text-gray-500 capitalize">
              {data.shopAddress}
            </span>
          </div>
        </div>
        <div className="grid pt-4  md:grid-cols-2 gap-10 text-gray-700">
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Owner</h3>
              <div className="flex items-center gap-2">
                <FaUserTie />
                <span>{data?.ownerName}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>{data?.phoneNumber}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Website</h3>
              <div className="flex items-center gap-2">
                <FaGlobe />
                <a
                  href={data?.website}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  {data?.website}
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Customer Service
              </h3>
              <p>{data?.customerServiceContact}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Operating Hours
              </h3>
              <p>
                {data?.operatingHours.open} - {data?.operatingHours.close}
              </p>
              <p>Days: {data?.operatingHours.daysOpen.join(", ")}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Established
              </h3>
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{data?.establishedYear}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Product Categories
              </h3>
              <ul className="list-disc list-inside">
                {data?.productCategories.map(
                  (
                    item:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactPortal
                          | React.ReactElement<
                              unknown,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined,
                    idx: React.Key | null | undefined
                  ) => (
                    <li key={idx}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Methods
              </h3>
              <p>{data?.paymentMethods.join(", ")}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Rating</h3>
              <div className="flex items-center gap-2 text-yellow-500">
                <FaStar />
                <span>{data?.rating}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Social Media
              </h3>
              <div className="flex gap-4 text-xl text-blue-600 mt-2">
                <a
                  href={data?.socialMediaLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebookF className="hover:text-blue-800 transition" />
                </a>
                <a
                  href={data?.socialMediaLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram className="hover:text-pink-600 transition" />
                </a>
                <a
                  href={data?.socialMediaLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter className="hover:text-sky-500 transition" />
                </a>
                <a
                  href={data?.socialMediaLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="hover:text-blue-700 border transition" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <Link href={"/dashboard/meal-provider/update-meal-provider"}>
          <div className=" pt-5 md:mt-10">
            <Button className="w-full mx-auto">update</Button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ShopInfoCard;
