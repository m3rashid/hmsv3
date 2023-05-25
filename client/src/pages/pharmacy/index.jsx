import { message, Tabs, Badge } from "antd";
import { createContext, useEffect, useState } from "react";

import { socket } from "api/instance";
import useNotifications from "Hooks/useNotifications";
import Notifications from "pages/doctor/notifications";
import Prescriptions from "pages/pharmacy/Prescriptions";
import usePharmacy from "components/Pharmacy/usePharmacy";
import InventoryTable from "pages/pharmacy/InventoryTable";
import CreateReceipts from "pages/pharmacy/CreateReceipts";

export const PharmacyContext = createContext();

const Pharmacy = () => {
  const { Inventory, setInventory, getMedicine, reduceMedicine } =
    usePharmacy();

  const { unseenNotifications, addNotification, markAllAsSeen } =
    useNotifications();

  useEffect(() => {
    socket.on("new-prescription-by-doctor-created", ({ data }) => {
      message.success(
        `New Prescription for ${data.prescription.id} created successfully!`
      );
      addNotification({
        type: "success",
        message: `New Prescription for ${data.prescription.id} created successfully!`,
        title: "New Prescription",
      });

      setPrescription((prev) => {
        return [
          ...prev,
          {
            id: data.prescription.id,
            patientname: data.patient?.name,
            doctorname: data.doctor?.name,
            date: data.prescription?.datePrescribed,
            medicine: data.prescription?.prescription,
            CustomMedicines: data.prescription?.CustomMedicines?.split("\n"),
          },
        ];
      });
    });

    return () => {
      socket.off("new-prescription-by-doctor-created");
    };
  }, [addNotification]);

  const [prescription, setPrescription] = useState([]);

  return (
    <PharmacyContext.Provider
      value={{
        prescription,
        setPrescription,
        Inventory,
        setInventory,
        getMedicine,
        reduceMedicine,
      }}
    >
      <div style={{ padding: "20px" }}>
        <Tabs
          centered
          defaultActiveKey="1"
          items={[
            {
              key: "0",
              tlabelab: "Prescriptions",
              content: <Prescriptions />,
            },
            {
              key: "1",
              label: "Create Receipts",
              content: <CreateReceipts />,
            },
            {
              key: "2",
              label: (
                <div onClick={() => markAllAsSeen()}>
                  <Badge
                    count={unseenNotifications()}
                    showZero={false}
                    offset={[5, -5]}
                  >
                    Notifications
                  </Badge>
                </div>
              ),
              children: <Notifications />,
            },
            {
              key: "3",
              label: "Inventory",
              content: <InventoryTable />,
            },
          ]}
        />
      </div>
    </PharmacyContext.Provider>
  );
};

export default Pharmacy;
