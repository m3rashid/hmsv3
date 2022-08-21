import { Space, Typography } from "antd";
import React from "react";

import { quantityCalculator } from "../../../components/Doctor/quantityCalculator";

const SingleMedicine = ({ index, medicine }) => {
  return (
    <Space direction="vertical" key={index} style={{ marginLeft: 20 }}>
      <Space>
        <Typography.Text style={{ fontWeight: "bold" }}>
          {medicine?.medicine?.name}
        </Typography.Text>
        <Typography.Text
          style={{
            padding: "5px 10px",
            borderRadius: 5,
            fontSize: "12px",
            backgroundColor: "#ff4d4f",
            color: "#fff",
          }}
        >
          # {medicine?.medicine?.id}
        </Typography.Text>
      </Space>
      <Space direction="vertical" style={{ padding: "10px" }}>
        <Typography.Text>
          Duration : <strong>{medicine?.duration} Days</strong>
        </Typography.Text>
        <Typography.Text>
          Dosage : <strong>{medicine?.dosage?.label}</strong>
        </Typography.Text>
        <Typography.Text>
          Quantity Required :{" "}
          <strong>
            {quantityCalculator(medicine?.duration, medicine?.dosage?.value)}
          </strong>
        </Typography.Text>
        <Typography.Text>{medicine?.description}</Typography.Text>
      </Space>
    </Space>
  );
};

export default SingleMedicine;
