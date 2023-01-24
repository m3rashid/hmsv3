import { Table } from "antd";
import { useContext } from "react";

import { PharmacyContext } from "pages/pharmacy";
import useTableStyles from "components/common/tableDefaults";

const columns = [
  {
    title: "Medicine",
    dataIndex: "medicine",
    key: "medicine",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];

function InventoryTable() {
  const { Inventory } = useContext(PharmacyContext);
  const { tableStyles } = useTableStyles();

  return (
    <div>
      <Table
        rowKey={(record) => record.id}
        style={{ ...tableStyles }}
        size="small"
        dataSource={Inventory}
        columns={columns}
      />
    </div>
  );
}

export default InventoryTable;
