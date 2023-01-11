import { useQuery } from "react-query";

import { instance } from "api/instance";
import Loading from "components/Loading/Loading";
import DisplayMedicine from "components/Doctor/DisplayMedicine";

function ShowPrescriptionByID({ id, type }) {
  const { data, isLoading, isError } = useQuery(
    ["prescription", id],
    async () => {
      if (type === "appointment") {
        const { data } = await instance.get(
          `/doctor/appointment-prescription/${id}`
        );

        return data;
      } else {
        const { data } = await instance.get(`/pharmacy/prescriptions/${id}`);

        return data.prescription;
      }
    }
  );

  if (isLoading || isError) {
    return <Loading />;
  }

  return (
    <DisplayMedicine
      id={data?.appointmentId}
      ExtraMedicines={data?.CustomMedicines}
      Medicines={data?.medicines}
      date={data?.createdAt}
      patient={data?.appointment?.patient}
      symptoms={data?.symptoms}
    />
  );
}

export default ShowPrescriptionByID;
