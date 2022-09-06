import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { Alert, Button, Col, Divider, Input, Row, Select, Space, Table, Typography } from "antd";
import { useDebounce } from "use-debounce";

import styles from "./medicineinput.module.css";
import { inventoryState } from "../../atoms/inventory";
import { instance } from "../../api/instance";
import { dosages } from "../../utils/constants";

const MedicineInputTable = ({
  medicines
}) => {
  const medicineDB = useRecoilValue(inventoryState);
  console.log(medicineDB);
  const [MedicineData, setMedicineData] = useState(medicine);
  const [Info, setInfo] = useState({
    available: true,
    quantityRequired: 0,
    medicine: {},
  });

  const [value] = useDebounce(MedicineData, 500);

  const handleChange = useCallback(
    (value, type) => {
      setMedicineData({
        ...MedicineData,
        [type]: value,
      });
    },
    [MedicineData]
  );

  const ValidateMedicine = useCallback(async () => {
    if (value) {
      const data = {
        dosage: value.dosage,
        medicineId: value?.Medicine?.id,
        duration: parseInt(value.duration),
      };

      if (data.dosage === "" || data.duration === 0 || !data?.medicineId)
        return;

      const { data: availabilityInfo } = await instance.post(
        "/doctor/med/check-availability",
        data
      );
      setInfo(availabilityInfo);
    }
  }, [value]);

  useEffect(() => {
    ValidateMedicine();
  }, [ValidateMedicine]);

  useEffect(() => {
    UpdateMedicine(medicineType, { ...value, ...Info }, index);
  }, [value, Info, UpdateMedicine, medicineType, index]);





  const MedicineInputTableColumns = [
    {
      title: "Medicine",
      dataIndex: "Medicine",
      key: "Medicine",
      render: (text, record) =>   <Select
            style={{ width: 250 }}
            // style={{flexGrow: 1 }}

            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children?.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                ?.toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            placeholder="Select medicine"
            onChange={(value) => {
              const Item = medicineDB?.Medicine?.inventory.find(
                (item) => item.id === value
              );
              handleChange(Item, "Medicine");
            }}
          >
            <Select.OptGroup label="Tablets">
              {medicineDB.Medicine?.inventory
                ?.filter((m) => m.medType === "TABLET")
                .map((medicine) => {
                  return (
                    <Select.Option key={medicine.id} value={medicine.id}>
                      {medicine.name}
                    </Select.Option>
                  );
                })}
            </Select.OptGroup>

            <Select.OptGroup label="Syrups">
              {medicineDB.Medicine?.inventory
                ?.filter((m) => m.medType === "SYRUP")
                .map((medicine) => {
                  return (
                    <Select.Option key={medicine.id} value={medicine.id}>
                      {medicine.name}
                    </Select.Option>
                  );
                })}
            </Select.OptGroup>
          </Select>

    },

    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      render: (text, medicine) => 
       <Select
            style={{ flexGrow: 1 }}
            placeholder="Select Dosage"
            defaultValue={medicine.dosage}
            className={styles.select}
            onChange={(value) => {
              handleChange(value, "dosage");
            }}
          >
            {dosages.map((dosage) => (
              <Select.Option key={dosage.value} value={dosage.value}>
                {dosage.label}
              </Select.Option>
            ))}
          </Select>

    },

  {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, medicine) =>
         <Input
            type={"number"}
            placeholder="Enter duration"
            defaultValue={medicine.duration}
            className={styles.input}
            onChange={(e) => handleChange(e.target.value, "duration")}
            addonAfter={"days"}
          />

  },
  {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, medicine) =>
         <Input.TextArea
            className={styles.textarea}
            defaultValue={medicine.description}
            onChange={(e) => handleChange(e.target.value, "description")}
          />

  }
  ]



  return (
    <>
      <Table />
    </>
  );
};

MedicineInputTable.propTypes = {
  index: PropTypes.number.isRequired,
  medicine: PropTypes.object.isRequired,
  deleteMedicine: PropTypes.func.isRequired,
  setMedicines: PropTypes.func.isRequired,
};

export default MedicineInputTable;
