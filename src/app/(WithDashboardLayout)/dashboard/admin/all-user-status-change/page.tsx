import AllUser from "@/components/admin/AllUser";
import { getAllUser } from "@/services/Auth/authServices";

const page = async () => {
  const { data } = await getAllUser();
  return (
    <div>
      <AllUser data={data}></AllUser>
    </div>
  );
};

export default page;
