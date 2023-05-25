import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { useRecoilValue } from "recoil";
import { DeleteOutlined } from "@ant-design/icons";
import { useDebounce } from "use-debounce";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Input, Row, Select, Space, Typography } from "antd";

import { instance } from "api/instance";
import { dosages } from "utils/constants";
import { inventoryState } from "atoms/inventory";
import styles from "components/Medicine/medicineinput.module.css";
import quillDefaults from "components/common/quillDefaults";

const MedicineInput = ({
  index,
  medicine,
  deleteMedicine,
  type: medicineType,
  UpdateMedicine,
  isExtra,
}) => {
  const medicineDB = useRecoilValue(inventoryState);
  const [MedicineData, setMedicineData] = useState(medicine);
  const [availabilityInfo, setAvailabilityInfo] = useState({
    available: true,
    quantityRequired: 0,
    medicine: null,
    loading: false,
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
      setAvailabilityInfo((prev) => ({ ...prev, loading: true }));

      const data = {
        dosage: value.dosage,
        medicineId: value?.Medicine?.id,
        duration: parseInt(value.duration),
      };

      if (data.dosage === "" || data.duration === 0 || !data?.medicineId)
        return;

      const { data: availabilityInfoData } = await instance.post(
        "/doctor/med/check-availability",
        data
      );
      setAvailabilityInfo({
        ...availabilityInfoData,
        loading: false,
      });
    }
  }, [value]);

  useEffect(() => {
    ValidateMedicine();
  }, [ValidateMedicine]);

  useEffect(() => {
    UpdateMedicine(medicineType, { ...value, ...availabilityInfo }, index);
  }, [value, availabilityInfo, UpdateMedicine, medicineType, index]);

  const inputStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 10px",
    margin: "auto",
  };

  return (
    <Row style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
      <Col span={5} style={inputStyles}>
        <Select
          getPopupContainer={(trigger) => trigger.parentNode}
          style={{ width: "100%" }}
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

        {!isExtra && medicine?.medicine?.quantity && (
          <Typography.Text type="danger">
            {medicine?.medicine?.quantity} left!
          </Typography.Text>
        )}
      </Col>
      <Col span={4} style={inputStyles}>
        <Select
          style={{ width: "100%" }}
          placeholder="Select Dosage"
          className={styles.select}
          onChange={(value) => handleChange(value, "dosage")}
        >
          {dosages.map((dosage) => (
            <Select.Option key={dosage.value} value={dosage.value}>
              {dosage.label}
            </Select.Option>
          ))}
        </Select>

        {medicine?.medicine?.medType === "SYRUP" && (
          <Space>
            <Input
              placeholder="Dosage Amount"
              type="number"
              min={0}
              onChange={(e) => handleChange(e.target.value, "dosageAmount")}
              value={medicine.dosageAmount}
              addonAfter={"ml"}
            />
          </Space>
        )}
      </Col>
      <Col span={4} style={inputStyles}>
        <Input
          type={"number"}
          placeholder="Enter duration"
          defaultValue={medicine.duration}
          className={styles.input}
          onChange={(e) => handleChange(e.target.value, "duration")}
          addonAfter={"days"}
        />
      </Col>
      <Col span={9} style={{ padding: "0 10px" }}>
        <ReactQuill
          value={medicine.description}
          onChange={(value) => handleChange(value, "description")}
          {...quillDefaults}
        />
      </Col>
      <Col span={2} style={inputStyles}>
        <Space
          direction="vertical"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Button
            type="dashed"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteMedicine(index, medicineType)}
          />
        </Space>
      </Col>
    </Row>
  );
};

MedicineInput.propTypes = {
  index: PropTypes.number.isRequired,
  medicine: PropTypes.object.isRequired,
  deleteMedicine: PropTypes.func.isRequired,
  setMedicines: PropTypes.func.isRequired,
};

export default MedicineInput;
