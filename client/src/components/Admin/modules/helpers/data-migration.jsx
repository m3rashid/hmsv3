import { useState } from "react";
import { Button, message, Upload } from "antd";
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
    <div
      style={{
        padding: "10px",
        marginTop: "100px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Data Migration</h2>
      <Upload.Dragger
        name="file"
        maxCount={1}
        onChange={onChange}
        onDrop={onDrop}
        accept=".xlsx, .xls, .csv, .xl, .ods, .ots, .xlr, .xltm"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint" style={{ padding: "10px" }}>
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Upload.Dragger>
      <Button onClick={uploadFile} style={{ margin: "10px 0", width: "50%" }}>
        Upload
      </Button>
    </div>
  );
};

export default DataMigrationInput;
