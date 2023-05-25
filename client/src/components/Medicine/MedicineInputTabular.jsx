import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { useRecoilValue } from "recoil";
import { useDebounce } from "use-debounce";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Input, Select, Spin, Table, Typography } from "antd";
import {
  LoadingOutlined,
  DeleteOutlined,
  DashOutlined,
} from "@ant-design/icons";

import { instance } from "api/instance";
import { dosages } from "utils/constants";
import { inventoryState } from "atoms/inventory";
import styles from "components/Medicine/medicineinput.module.css";
import quillDefaults from "components/common/quillDefaults";
import useTableStyles from "components/common/tableDefaults";

const MedicineInputTable = ({ medicines, setMedicines, showDepth = true }) => {
  const { tableStyles } = useTableStyles();

  const addEmptyMedicine = useCallback(
    (type) => {
      setMedicines((prev) => ({
        ...prev,
        medicines: [
          ...prev.medicines,
          {
            Medicine: {},
            dosage: "",
            duration: 0,
            key: prev.medicines.length || 0,
          },
        ],
      }));
    },
    [setMedicines]
  );

  const medicineChangeHandler = useCallback(
    (index, med) => {
      setMedicines((prev) => ({
        ...prev,
        medicines: prev.medicines.map((m, idx) => {
          if (idx === index) {
            return { ...m, Medicine: med };
          }
          return m;
        }),
      }));
    },
    [setMedicines]
  );

  const deleteMedicineHandler = useCallback(
    (key) => {
      setMedicines((prev) => ({
        ...prev,
        medicines: prev.medicines.filter((itm) => itm.key !== key),
      }));
    },
    [setMedicines]
  );

  const dosageChangeHandler = useCallback(
    (index, dosage) => {
      setMedicines((prev) => ({
        ...prev,
        medicines: prev.medicines.map((m, idx) => {
          if (idx === index) {
            return { ...m, dosage };
          }
          return m;
        }),
      }));
    },
    [setMedicines]
  );

  const durationChangeHandler = useCallback(
    (index, duration) => {
      setMedicines((prev) => ({
        ...prev,
        medicines: prev.medicines.map((m, idx) => {
          if (idx === index) {
            return { ...m, duration };
          }
          return m;
        }),
      }));
    },
    [setMedicines]
  );

  const quantityRequiredHandler = useCallback(
    (index, quantityRequired) => {
      setMedicines((prev) => ({
        ...prev,
        medicines: prev.medicines.map((m, idx) => {
          if (idx === index) {
            return { ...m, quantityRequired };
          }
          return m;
        }),
      }));
    },
    [setMedicines]
  );

  const medicineInputTableColumns = [
    {
      title: "Medicine",
      dataIndex: "medicine",
      key: "medicine",
      render: (text, record) => (
        <MedicineNameCol
          medicine={record}
          medicineChangeHandler={medicineChangeHandler}
          index={record.key}
        />
      ),
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      render: (text, record) => (
        <DosageCol
          dosage={text}
          dosageChangeHandler={dosageChangeHandler}
          index={record.key}
        />
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) => (
        <DurationCol
          durationChangeHandler={durationChangeHandler}
          duration={record.duration}
          index={record.key}
        />
      ),
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (text, record) => (
        <AvailabilityCol
          medicine={record}
          index={record.key}
          quantityRequiredHandler={quantityRequiredHandler}
        />
      ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text, medicine) => (
        <RemarksCol remarks={text} medicine={medicine} />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => deleteMedicineHandler(record.key)}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        rowKey={(record) => record.id}
        size="small"
        columns={medicineInputTableColumns}
        dataSource={medicines || []}
        style={showDepth ? { ...tableStyles } : {}}
      />
      <Button
        type="dashed"
        onClick={addEmptyMedicine}
        style={{ margin: "auto", display: "flex", marginTop: "1rem" }}
      >
        + Add Medicine
      </Button>
    </Fragment>
  );
};

MedicineInputTable.propTypes = {
  medicine: PropTypes.object,
};

export default MedicineInputTable;

const MedicineNameCol = ({ medicine, medicineChangeHandler, index }) => {
  const medicineDB = useRecoilValue(inventoryState);

  return (
    <Select
      getPopupContainer={(trigger) => trigger.parentNode}
      style={{ width: 250 }}
      value={medicine?.medicine?.name}
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
        medicineChangeHandler(index, Item);
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
  );
};

const DosageCol = ({ dosage, dosageChangeHandler, index }) => {
  return (
    <Select
      style={{ flexGrow: 1 }}
      placeholder="Select Dosage"
      value={dosage.value}
      className={styles.select}
      onChange={(value) => {
        dosageChangeHandler(index, value);
      }}
    >
      {dosages.map((dosage) => (
        <Select.Option key={dosage.value} value={dosage.value}>
          {dosage.label}
        </Select.Option>
      ))}
    </Select>
  );
};

const DurationCol = ({ durationChangeHandler, index, duration }) => {
  return (
    <Input
      type={"number"}
      placeholder="Enter duration"
      value={duration}
      className={styles.input}
      onChange={(e) => durationChangeHandler(index, e.target.value)}
      addonAfter={"days"}
    />
  );
};

const AvailabilityCol = ({ medicine, index, quantityRequiredHandler }) => {
  const [availabilityInfo, setAvailabilityInfo] = useState({
    available: true,
    quantityRequired: 0,
    medicine: null,
    loading: false,
  });
  const [value] = useDebounce(medicine, 500);

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
    quantityRequiredHandler(index, availabilityInfo.quantityRequired);
  }, [availabilityInfo.quantityRequired, index, quantityRequiredHandler]);

  return (
    <>
      {value?.Medicine?.id && value.dosage && value.duration ? (
        <Spin
          spinning={availabilityInfo.loading}
          indicator={<LoadingOutlined />}
        >
          <Typography.Text
            type={availabilityInfo.available ? "success" : "warning"}
          >
            {availabilityInfo.available ? "Available" : "Unavailable"}
            &nbsp;
            {availabilityInfo.medicine &&
              `(${availabilityInfo.quantityRequired}/${availabilityInfo.medicine.quantity})`}
          </Typography.Text>
        </Spin>
      ) : value?.medicine?.quantity ? (
        <Typography>{value?.medicine?.quantity} in stock</Typography>
      ) : (
        <Typography style={{ textAlign: "center" }}>
          <DashOutlined />
        </Typography>
      )}
    </>
  );
};

const RemarksCol = ({ remarks, medicine, index }) => {
  const handleChange = (value, field) => {};

  return (
    <ReactQuill
      value={medicine.description}
      onChange={(value) => handleChange(value, "description")}
      {...quillDefaults}
    />
  );
};
