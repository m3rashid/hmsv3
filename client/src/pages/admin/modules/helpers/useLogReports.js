import React from "react";
import { useRecoilState } from "recoil";

import { instance } from "../../../../api/instance";
import { logReports } from "../../../../atoms/logs";

const useLogReports = () => {
  const [allLogs, setAllLogs] = useRecoilState(logReports);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [details, setDetails] = React.useState(null);

  const handleOk = () => {
    setIsModalVisible(true);
    setDetails(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDetails(null);
  };

  const getLogs = async () => {
    const res = await instance.post("/admin/gen-report", {});
    setAllLogs(res.data);
  };

  const getDetails = async (logEntry) => {
    const res = await instance.post("/admin/report-details", { log: logEntry });
    console.log(res.data);
    setDetails(res.data);
  };

  return {
    getLogs,
    allLogs,
    getDetails,
    handleOk,
    handleCancel,
    isModalVisible,

    details,
  };
};

export default useLogReports;
