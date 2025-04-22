import {
  Mail,
  Phone,
  MapPin,
  Cake,
  Shield,
  Lock,
  BadgeCheck,
  User as UserIcon,
} from "lucide-react";
import { TUser } from "@/types";

const ViewProfile = ({ data }: { data: TUser }) => {
  console.log(data);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 ">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden box-shadow">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 p-6 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-lg">
              <UserIcon className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-6 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {data?.fullName}
              </h1>
              <div className="flex items-center mt-2">
                <BadgeCheck
                  className={`h-5 w-5 ${
                    data.role === "admin" || "customer"
                      ? "text-purple-600"
                      : data.role === "mealProvider"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                />
                <span className="ml-2 text-sm font-medium text-gray-500 capitalize">
                  {data.role} {data.isShop && "• Shop Owner"}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              {data.isBlock && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                  Blocked
                </span>
              )}
              {data.isDelete && (
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                  Deleted
                </span>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-gray-800 break-all">{data.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-gray-800">{data.phoneNumber}</p>
                  </div>
                </div>
                {data.secondaryPhone && (
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 text-gray-500 mr-3 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500">Secondary Phone</p>
                      <p className="text-gray-800">{data.secondaryPhone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start">
                  <Cake className="h-4 w-4 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-gray-800">
                      {data.dateOfBirth
                        ? formatDate(data.dateOfBirth)
                        : "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-4 w-4 text-gray-500 mr-3 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="text-gray-800 capitalize">
                      {data.gender || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gray-50 p-5 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Address Information
              </h2>
              <div className="space-y-4">
                {data.address ? (
                  <>
                    <div>
                      <p className="text-xs text-gray-500">Village/Street</p>
                      <p className="text-gray-800">
                        {data.address.village || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Post Office</p>
                      <p className="text-gray-800">
                        {data.address.post || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Postal Code</p>
                      <p className="text-gray-800">
                        {data.address.postCode || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sub-District</p>
                      <p className="text-gray-800">
                        {data.address.subDistrict || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">District</p>
                      <p className="text-gray-800">
                        {data.address.district || "Not specified"}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">
                    No address information available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-blue-600" />
              Account Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Account Created</p>
                <p className="text-gray-800">
                  {data.createdAt ? formatDate(data.createdAt) : "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="text-gray-800">
                  {data.updatedAt ? formatDate(data.updatedAt) : "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
