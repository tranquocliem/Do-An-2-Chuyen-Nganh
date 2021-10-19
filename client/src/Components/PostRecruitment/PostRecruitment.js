import React, { useContext, useState } from "react";
import "./index.css";
import { Helmet } from "react-helmet";
import QuillEditor from "../QuillEditor/QuillEditor";
import ImageUpload from "./ImageUpload";
import Selects from "./Selects";
import { AuthContext } from "../../Context/AuthContext";
import Message from "../Message/Message";
import { uploadImage } from "../../Shared/uploadIMG";
import RecruimentService from "../../Services/RecruimentService";

function PostRecruitment(props) {
  const [message, setMessage] = useState(false);
  const [salary, setSalary] = useState("");
  const [files, setFiles] = useState([]);
  const [maxSalary, setMaxSalary] = useState(false);
  const [description, setDescription] = useState("");
  // const [img, setImg] = useState(["uploads\\tuyen-dung.png"]);
  const [city, setCity] = useState("");
  const [career, setCareer] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSDT] = useState("");
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const { user } = useContext(AuthContext);

  //Validate Form Nhập
  const [valititle, setvalititle] = useState(true);
  const [validescription, setvalidescription] = useState(true);
  const [valisalary, setvalisalary] = useState(true);
  const [valicity, setvalicity] = useState(true);
  const [valicareer, setvalicareer] = useState(true);
  const [valiemail, setValiemail] = useState(true);
  const [images, setImages] = useState([]);

  const onEditorChange = (value) => {
    setDescription(value);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const clearForm = () => {
    setSalary("");
    setMaxSalary(false);
    setDescription("");
    setEmail("");
    setSDT("");
    setContact("");
    setTitle("");
    setCity("");
    setCareer("");
  };

  const handleTien = (e) => {
    if (e.key === "." || e.key === "-" || e.key === ",") {
      alert("vui lòng chỉ nhập số");
      e.preventDefault();
    } else if (e.target.value > 9999999999) {
      setMaxSalary(true);
    } else if (e.target.value <= 9999999999) {
      setMaxSalary(false);
    }
    if (e.target.value >= 9999999999999999) {
      return false;
    }
    var tf = parseInt(e.target.value, 10);
    //x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    //tf = tf.toLocaleString("it-IT",{style:"currency",currency:"VND"});
    setSalary(tf);
  };

  const fm = () => {
    let t = parseInt(salary, 10);
    // console.log(t);
    if (isNaN(t)) return 0;
    else {
      t = t.toLocaleString({ style: "currency", currency: "VND" });
      return t;
    }
  };

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleContact = (e) => {
    e.preventDefault();
    setContact(e.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSDT = (e) => {
    e.preventDefault();
    setSDT(e.target.value);
  };

  const handleCity = (value) => {
    setCity(value);
  };

  const handleCareer = (value) => {
    setCareer(value);
  };

  const Reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const onSubmit = async (e) => {
    const testEmail = new RegExp(Reg).test(email);
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    let IMG = ["uploads\\tuyen-dung.png"];

    if (images.length > 0) {
      IMG = await uploadImage(images);
    }

    const variable = {
      email: email,
      sdt: sdt,
      contact: contact,
      salary: salary,
      title: title,
      description: description,
      img: IMG.length < 1 ? "" : IMG,
      writer: user._id,
      city: city.value,
      career: career.value,
    };

    if (
      title !== "" &&
      title.length >= 10 &&
      description !== "" &&
      description.length >= 30 &&
      salary !== "" &&
      city !== "" &&
      career !== "" &&
      email !== "" &&
      testEmail
    ) {
      RecruimentService.createRecruitment(variable).then((data) => {
        if (!data.message.msgError) {
          clearForm();
          setvalititle(true);
          setvalidescription(true);
          setvalisalary(true);
          setvalicity(true);
          setvalicareer(true);
          setValiemail(true);
          setMessage(data.message);
          setTimeout(() => {
            props.history.push("/");
          }, 2000);
        } else {
          setMessage(data.message);
        }
      });
    } else {
      setMessage({
        msgBody: "Đăng tin không thành công, Vui lòng xem lại thông tin",
        msgError: true,
      });
      if (title === "" || title.length < 10) {
        setvalititle(false);
      }
      if (title !== "" && title.length >= 10) {
        setvalititle(true);
      }
      if (description === "" || description.length < 30) {
        setvalidescription(false);
      }
      if (description !== "" && description.length >= 30) {
        setvalidescription(true);
      }
      if (salary === "") {
        setvalisalary(false);
      }
      if (salary !== "") {
        setvalisalary(true);
      }
      if (city === "") {
        setvalicity(false);
      }
      if (city !== "") {
        setvalicity(true);
      }
      if (career === "") {
        setvalicareer(false);
      }
      if (career !== "") {
        setvalicareer(true);
      }
      if (email === "" || !testEmail) {
        setValiemail(false);
      }
      if (email !== "" && testEmail) {
        setValiemail(true);
      }
    }
  };

  const imagesUpload = (img) => {
    setImages(img);
  };

  return (
    <>
      <Helmet>
        <title>Đăng Tin</title>
      </Helmet>
      <section className="page-section my-3 post">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Đăng tin tuyển dụng
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto sp-ct">
              {user.status ? null : (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-triangle px-2"></i>Tài Khoản
                  Này Đã Bị Khoá.
                </div>
              )}

              {message ? <Message message={message} /> : null}
              <form
                id="contactForm"
                name="sentMessage"
                noValidate="novalidate"
                onSubmit={onSubmit}
              >
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    {valititle === false ? (
                      <p
                        style={{ fontStyle: "italic", transition: "0.5s" }}
                        className="text-warning no-select"
                      >
                        Lưu ý: không bỏ trống, không nhập ít hơn 10 ký tự
                      </p>
                    ) : null}
                    <input
                      onChange={handleTitle}
                      className="form-control"
                      name="title"
                      type="text"
                      placeholder="Tiêu đề hoặc vị trí tuyển dụng"
                      autoFocus={true}
                    />
                  </div>
                </div>
                <ImageUpload imagesUpload={imagesUpload} />
                <h4 className="text-uppercase text-secondary mt-5">
                  Mô tả công việc:
                </h4>
                {validescription === false ? (
                  <p
                    style={{ fontStyle: "italic", transition: "0.5s" }}
                    className="text-warning no-select"
                  >
                    Lưu ý: không bỏ trống, không nhập ít hơn 30 ký tự
                  </p>
                ) : null}
                <QuillEditor
                  placeholder={"Nhập Mô Tả Công Việc..."}
                  onEditorChange={onEditorChange}
                  onFilesChange={onFilesChange}
                />
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Tiền Lương</label>
                    {valisalary === false ? (
                      <p
                        style={{ fontStyle: "italic", transition: "0.5s" }}
                        className="text-warning no-select"
                      >
                        Lưu ý: không bỏ trống
                      </p>
                    ) : null}
                    {maxSalary === false ? null : (
                      <p className="valiSalary">
                        <i>Cảnh báo số quá lớn có thể không hổ trợ!!!</i>
                      </p>
                    )}
                    <input
                      style={{ zIndex: "unset" }}
                      className="form-control"
                      type="number"
                      maxLength={10}
                      value={salary}
                      name="salary"
                      placeholder="Tiền Lương"
                      onChange={handleTien}
                      onKeyPress={handleTien}
                    />
                  </div>
                  {salary === "" || isNaN(salary) ? (
                    <div className="my-3"></div>
                  ) : (
                    <p className="salary-display bg-primary">{`${fm()} VNĐ`}</p>
                  )}
                </div>
                <Selects
                  handleCity={handleCity}
                  handleCareer={handleCareer}
                  city={city}
                  career={career}
                  valicity={valicity}
                  valicareer={valicareer}
                />
                <hr />
                <h4 className="text-uppercase text-secondary mt-5">
                  Thông tin liên hệ:
                </h4>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    {valiemail === false ? (
                      <p
                        style={{ fontStyle: "italic", transition: "0.5s" }}
                        className="text-warning no-select"
                      >
                        Lưu ý: không bỏ trống, và đúng mẫu (user@gmail.com)
                      </p>
                    ) : null}
                    <input
                      onChange={handleEmail}
                      className="form-control"
                      name="email"
                      type="text"
                      placeholder="E-mail"
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>SĐT</label>
                    <input
                      onChange={handleSDT}
                      className="form-control"
                      name="sdt"
                      type="number"
                      placeholder="Số Điện Thoại"
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Tên Liên Hệ</label>
                    <input
                      onChange={handleContact}
                      className="form-control"
                      name="contact"
                      type="text"
                      placeholder="Tên Người Liên Hệ"
                    />
                  </div>
                </div>
                <br />
                <div id="success" />
                <div className="form-group btn-post mt-3">
                  <button
                    className="btn btn-primary btn-xl "
                    id="sendMessageButton"
                    type="submit"
                    disabled={user.status ? false : true}
                  >
                    Đăng Tuyển Dụng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PostRecruitment;
