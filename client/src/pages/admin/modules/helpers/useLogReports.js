import { useRecoilState } from "recoil";

import { instance } from "../../../../api/instance";
import { logReports } from "../../../../atoms/logs";

const useLogReports = () => {
  const [allLogs, setAllLogs] = useRecoilState(logReports);

  const getLogs = async () => {
    const res = await instance.post("/admin/gen-report", {});
    setAllLogs(res.data);
  };

  return {
    getLogs,
    allLogs,
  };
};

export default useLogReports;
