import { Button, message } from "antd";
import { useRecoilState } from "recoil";

import { instance } from "api/instance";
import { adminState } from "atoms/admin";
import { formatForTable } from "components/Admin/modules/helpers/table";

const useGetUserDetail = ({ userType, userRole }) => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  const getAllUsers = async () => {
    if (adminData[userType].length !== 0) return;
    await getUsers();
  };

  const getSinglePatientDetail = async (id) => {
    const res = await instance.post("/admin/single-patient-details", {
      id,
    });
    console.log(res.data);
  };

  const getUsers = async () => {
    try {
      const res = await instance.post("/admin/all", { userRole });

      const users =
        userRole !== "PATIENT"
          ? formatForTable(res.data.users)
          : res.data.users;
      setAdminData((prev) => ({ ...prev, [userType]: users }));
    } catch (err) {}
  };

  const RefreshUserButton = () => {
    console.log({ adminData });
    return (
      <Button
        onClick={() =>
          getUsers().then(message.success("Users fetched successfully")).catch()
        }
      >
        Refresh Users
      </Button>
    );
  };

  return {
    getAllUsers,
    getUsers,
    RefreshUserButton,
    users: adminData[userType],
    getSinglePatientDetail,
  };
};

export default useGetUserDetail;
