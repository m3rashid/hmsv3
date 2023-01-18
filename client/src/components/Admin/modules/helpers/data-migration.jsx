import { Fragment, useState } from "react";
import { Button, message, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { instance } from "api/instance";

const DataMigrationInput = () => {
  const [file, setFile] = useState(null);

  const onDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const onChange = (info) => {
    setFile(info.file);
  };

  const uploadFile = async () => {
    if (!file) {
      message.error("Please select a file to upload");
      return;
    }
    const form = new FormData();
    form.append("data", file.originFileObj);

    const res = await instance.post("/data-migration", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  };

  return (
    <Fragment>
      <Typography.Title level={4}>Data Migration</Typography.Title>
      <Upload.Dragger
        name="file"
        maxCount={1}
        onChange={onChange}
        onDrop={onDrop}
        accept=".xlsx, .xls, .csv, .xl, .ods, .ots, .xlr, .xltm"
        style={{ paddingLeft: 25, paddingRight: 25 }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint" style={{ padding: "10px" }}>
          Support for a single bulk upload
        </p>
      </Upload.Dragger>
      <Button onClick={uploadFile} style={{ margin: "10px 0", width: "30%" }}>
        Upload
      </Button>
    </Fragment>
  );
};

export default DataMigrationInput;
