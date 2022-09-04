import { useRecoilState } from "recoil";
import { instance } from "../../../../api/instance";

import { formatForTable } from "./table";
import { adminState } from "../../../../atoms/admin";

const useGetUserDetail = ({ userType, userRole }) => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  const getAllUsers = async () => {
    try {
      if (adminData[userType].length !== 0) return;

      const res = await instance.post("/admin/all", { userRole });

      const users = formatForTable(res.data.users);
      setAdminData((prev) => ({ ...prev, [userType]: users }));
    } catch (err) {}
  };

  return {
    getAllUsers,
    users: adminData[userType],
  };
};

export default useGetUserDetail;
