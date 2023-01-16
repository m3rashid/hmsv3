import { Button, message } from "antd";
import { useRecoilState } from "recoil";

import { instance } from "api/instance";
import { adminState } from "atoms/admin";
import { formatForTable } from "components/Admin/modules/helpers/table";
import dayjs from "dayjs";
import { showGender } from "utils/strings";

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
    const filteredData = Object.entries(res.data).reduce(
      (acc, [key, value]) => {
        if (!value || value === "null" || value === "undefined" || value === "")
          return acc;
        if (key === "createdAt" || key === "updatedAt")
          return {
            ...acc,
            [key]: dayjs(value).format("DD/MM/YYYY"),
          };
        else if (key === "relationWithOtherUser" || key === "id") return acc;
        else if (key === "sex") return { ...acc, [key]: showGender(value) };
        return { ...acc, [key]: value };
      },
      {}
    );
    return filteredData;
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
    RefreshUserButton,
    users: adminData[userType],
    getSinglePatientDetail,
  };
};

export default useGetUserDetail;
