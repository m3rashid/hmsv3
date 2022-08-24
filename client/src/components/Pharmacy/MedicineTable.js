import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
// const EditableContext = React.createContext(null);
const DOSAGE_MAP = {
  OD: 1,
  BD: 2,
  TD: 3,
  QD: 4,
  OW: 1 / 7,
  BW: 2 / 7,
  TW: 3 / 7,
  QW: 4 / 7,
};

const MedicineTable = ({
  medicines = [],
  selectedMedicines,
  setSelectedMedicines,
}) => {
  const [dispensingMedicines, setDispensingMedicines] = useState([]);

  useEffect(() => {
    setDispensingMedicines(
      medicines.map((med) => {
        const requiredQuantity = Math.ceil(
          med.duration * DOSAGE_MAP[med.dosage]
        );
        return {
          ...med,
          requiredQuantity,
          amountDispensed: 0,
          stock: med.Medicine.quantity,
          name: med.Medicine.name,
          key: med.id,
        };
      })
    );
  }, [medicines]);

  const handlerDispensedAmount = (id, amount) => {
    setDispensingMedicines((prevState) => {
      return prevState.map((med, i) => {
        if (med.id === id) {
          return { ...med, amountDispensed: amount };
        }
        return med;
      });
    });
  };
  console.log(medicines);
  const columns = [
    {
      title: "Medicine",
      dataIndex: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "requiredQuantity",
    },
    {
      title: "Available Stock",
      dataIndex: "stock",
    },
    {
      title: "Amount Dispensed",
      dataIndex: "amountDispensed",
      render: (text, record) => {
        return (
          <Input
            onChange={(e) => handlerDispensedAmount(record.id, e.target.value)}
            type="number"
            min={0}
            max={Math.min(record.requiredQuantity, record.stock)}
            value={record.amountDispensed}
          />
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys);

      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedMedicines(selectedRows);
      setDispensingMedicines((prevState) => {
        return prevState.map((med, i) => {
          if (selectedRowKeys.includes(med.key)) {
            return {
              ...med,
              amountDispensed: Math.min(med.requiredQuantity, med.stock),
            };
          } else {
            return {
              ...med,
              amountDispensed: 0,
            };
          }
        });
      });
    },
    getCheckboxProps: (record) => ({
      disabled: record.stock === 0, // Column configuration not to be checked
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <Table
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      columns={columns}
      dataSource={dispensingMedicines}
    />
  );
};

export default MedicineTable;
