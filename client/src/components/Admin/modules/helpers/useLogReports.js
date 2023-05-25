import dayjs from "dayjs";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { instance } from "api/instance";
import { logReports } from "atoms/logs";
import { showGender } from "utils/strings";

const useLogReports = () => {
  const [allLogs, setAllLogs] = useRecoilState(logReports);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [details, setDetails] = useState({});

  const handleOk = () => {
    setIsModalVisible(true);
    setDetails({});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDetails({});
  };

  const getLogs = async () => {
    const res = await instance.post("/admin/gen-report", {});
    setAllLogs(res.data);
  };

  const refreshLogs = () => {
    getLogs().then().catch();
  };

  const getDetails = async (logEntry) => {
    const res = await instance.post("/admin/report-details", { log: logEntry });
    const actionToShow = Object.entries(res.data.action).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {}
    );

    const allData = Object.entries({
      ...logEntry,
      ...res.data.action,
      ...actionToShow,
    }).reduce((acc, [key, val]) => {
      if (
        !val ||
        key === "availableDays" ||
        key.endsWith("id") ||
        key.endsWith("Id")
      ) {
        return acc;
      }
      if (key === "sex") return { ...acc, [key]: showGender(val) };
      if (key.endsWith("at") || key.endsWith("At")) {
        return { ...acc, [key]: dayjs(val).format("DD-MM-YYYY hh:mm A") };
      }
      return { ...acc, [key]: val };
    }, {});

    setDetails(allData);
    setIsModalVisible(true);
  };

  return {
    getLogs,
    allLogs,
    getDetails,
    handleOk,
    handleCancel,
    isModalVisible,

    details,
    refreshLogs,
  };
};

export default useLogReports;
