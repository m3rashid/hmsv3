import { Fragment, useState } from "react";
import {
  Button,
  message,
  Progress,
  Spin,
  theme,
  Typography,
  Upload,
} from "antd";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";

import { instance } from "api/instance";
import { useRecoilValue } from "recoil";
import { configState } from "atoms/config";

const DataMigrationInput = () => {
  const config = useRecoilValue(configState);
  const { token } = theme.useToken();
  const [file, setFile] = useState(null);
  const [percentFileUpload, setPercentFileUpload] = useState(0);
  const [loading, setLoading] = useState(false);

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

    try {
      const res = await instance.post("/data-migration", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progress) => {
          const { loaded, total } = progress;
          let percent = Math.floor((loaded * 100) / total);
          setPercentFileUpload(percent);
          if (percent < 100) {
          } else {
            setLoading(true);
          }
        },
      });
      message.success(res.data.message || "Upload successful");
    } catch (err) {
      message.error("Error in processing file");
    } finally {
      setFile(null);
      setLoading(false);
    }
  };

  const containerStyles = {
    display: "flex",
    gap: 20,
    padding: 20,
    border: "1px dashed #d9d9d9",
    borderRadius: 8,
    background: "rgba(0,0,0,0.02)",
    color: "rgba(0,0,0,0.88)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <Fragment>
      <Typography.Title level={4}>Data Migration</Typography.Title>
      {loading ? (
        <div style={containerStyles}>
          <Spin
            size="large"
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24, color: token.colorPrimary }}
              />
            }
          />
          <Typography.Text>Processing your file</Typography.Text>
        </div>
      ) : file && percentFileUpload !== 0 ? (
        <div style={containerStyles}>
          <Progress
            type="circle"
            strokeColor={token.colorPrimary}
            percent={percentFileUpload}
            status={percentFileUpload === 100 ? "success" : "normal"}
          />
          <Typography.Text>Uploading file to the server</Typography.Text>
        </div>
      ) : (
        <Upload.Dragger
          action=""
          progress={{
            strokeColor: config.app_theme_color,
            strokeWidth: 3,
          }}
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
      )}
      <Button
        onClick={uploadFile}
        disabled={loading || percentFileUpload !== 0}
        style={{ margin: "10px 0", width: "30%" }}
      >
        Upload
      </Button>
    </Fragment>
  );
};

export default DataMigrationInput;
