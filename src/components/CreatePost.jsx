// src/components/CreatePost.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button } from "antd";
import FormUpload from "./FormUpload";

const CreatePost = ({
  onSubmit,
  editingPost,
  isModalVisible,
  setIsModalVisible,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [image, setImage] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (editingPost) {
      setValue("title", editingPost.title);
      setValue("content", editingPost.content);
      setImage(editingPost.image);
      if (editingPost.image) {
        setFileList([{ uid: "-1", url: editingPost.image }]);
      }
    } else {
      reset();
      setImage(null);
      setFileList([]);
    }
  }, [editingPost, reset, setValue]);

  console.log(editingPost, "editedData==>");

  const onSubmitForm = (data) => {
    if (!image) {
      alert("Image is required");
      return;
    }
    onSubmit({ ...data, image });
    reset();
    setImage(null);
    setFileList([]);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
    setImage(null);
    setFileList([]);
  };

  return (
    <>
      <Button type="primary" className="antd-button" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Create Post"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="input-form">
            <div>
              <label htmlFor="title" className="label-form">
                
                <span className="sup">*</span>Title
              </label>
            </div>
            <input
              type="text"
              className="form-input"
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div className="input-form">
            <div>
            <label htmlFor="content"><span className="sup">*</span> Content</label>
            </div>
            <textarea
            className="form-input"
              id="content"
              {...register("content", { required: "Content is required" })}
              placeholder="Content"
            />
            {errors.content && <p>{errors.content.message}</p>}
          </div>
          <div className="input-form">
            <FormUpload
              setImage={setImage}
              setFileList={setFileList}
              fileList={fileList}
            />
          </div>
          <button type="submit" className="button-post">{editingPost?.title ? "Edit Post":"Create Post"}</button>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
