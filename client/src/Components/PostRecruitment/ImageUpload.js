import React, { useState } from "react";
import Dropzone from "react-dropzone";

function ImageUpload(props) {
  const [images, setImages] = useState([]);

  const onDrop = (files) => {
    let newImages = [];

    if (images.length <= 9) {
      files.forEach((file) => {
        if (!file) return alert("Hình ảnh không tồn tại");
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          return alert("Định dạng không hổ trợ");
        }
        if (file.size > 1024 * 1024 * 25) {
          return alert("File tải lên quá lớn");
        }
        if (newImages.length <= 9) {
          return newImages.push(file);
        } else {
          return alert("Số ảnh tải lên không quá 10");
        }
      });
    } else {
      alert("Số ảnh tải lên không quá 10");
    }

    if (images.length <= 9) {
      setImages([...images, ...newImages]);
      let newIMG = [...images, ...newImages];
      props.imagesUpload(newIMG);
    } else {
      alert("Số ảnh tải lên không quá 10");
    }
  };

  const maxFiles = (files) => {
    if (images.length > 9) {
      alert("Số ảnh tải lên không quá 10");
    } else if (images.length <= 9) {
      onDrop(files);
    }
  };

  const deleteImg = (i) => {
    const newArrImages = [...images];
    newArrImages.splice(i, 1);
    setImages(newArrImages);
    props.imagesUpload(newArrImages);
  };

  return (
    <>
      <div className="row pt-5 d-flex justify-content-center">
        <div className="col">
          <Dropzone onDrop={maxFiles} multiple={true} maxSize={80000000}>
            {({ getRootProps, getInputProps }) => (
              <div className="drop-zone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="content-dropzone no-select">
                  Thêm ảnh đại diện cho công việc
                </p>
                <br />
                <p className="content-dropzone no-select">
                  (Có thể bỏ qua mục này)
                </p>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <hr />
      {images.length > 0 ? (
        <>
          <h4 className="text-uppercase text-secondary mt-5">hình ảnh:</h4>
          <div className="row pt-3 d-flex justify-content-center">
            <div
              className="col"
              style={{
                textAlign: "center",
                width: "300px",
                height: "270px",
                overflowX: "scroll",
              }}
            >
              {images.map((image, index) => (
                <img
                  alt={`hinh-${index}`}
                  // onClick={() => onDelete(image)}
                  // src={image}
                  onClick={() => deleteImg(index)}
                  style={{ width: "300px", height: "240px", margin: "5px" }}
                  src={URL.createObjectURL(image)}
                  key={index}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default ImageUpload;
