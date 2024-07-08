import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { getBase64 } from "../utils";

const FormUpload = ({ setImage, setClearImage, setFileList, fileList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  console.log(fileList, "filesData");

  // useEffect(() => {
  //   setClearImage(() => {
  //     setFileList([]);
  //     setPreviewImage('');
  //     setPreviewOpen(false);
  //     setImage(null);
  //   });
  // }, [setClearImage, setImage]);

  console.log(fileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      getBase64(newFileList[0].originFileObj).then((base64) =>
        setImage(base64)
      );
    } else {
      setImage(null);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <label htmlFor="upload"><span className="sup">*</span>Upload your Post</label>
      <Upload
        id="upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default FormUpload;
