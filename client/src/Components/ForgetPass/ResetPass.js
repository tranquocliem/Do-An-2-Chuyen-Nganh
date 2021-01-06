import React, { useState, useEffect, useRef } from "react";
import AccountService from "../../Services/AccountService";
import Message from "../Message/Message";
import { Helmet } from "react-helmet";

function ResetPass(props) {
  const [rPassword, setRPassword] = useState({
    token: props.match.params.token,
    password: "",
    confirmPass: "",
  });

  const [valiPass, setValiPass] = useState(true);
  const [valiPassCF, setValiPassCF] = useState(true);
  const [message, setMessage] = useState(false);
  let timeID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeID);
    };
  }, []);

  const resetForm = () => {
    setRPassword({
      token: props.match.params.token,
      password: "",
      confirmPass: "",
    });
    setValiPass(true);
    setValiPassCF(true);
  };

  const onChange = (e) => {
    e.preventDefault();
    const newPass = { ...rPassword };
    newPass[e.target.name] = e.target.value;
    setRPassword(newPass);
  };

  const onSubmit = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
    if (
      rPassword.password !== "" &&
      rPassword.password.length + 1 > 6 &&
      rPassword.confirmPass === rPassword.password &&
      rPassword.confirmPass !== ""
    ) {
      setValiPass(true);
      setValiPassCF(true);
      const variable = {
        resetLink: rPassword.token,
        newPassword: rPassword.password,
      };
      AccountService.resetPass(variable).then((data) => {
        const { message } = data;
        setMessage(message);

        if (!message.msgError) {
          resetForm();
          timeID = setTimeout(() => {
            props.history.push("/login");
          }, 2500);
          setMessage(message);
        }
      });
    } else {
      if (rPassword.password === "" || rPassword.password.length + 1 < 6) {
        setValiPass(false);
      } else {
        setValiPass(true);
      }
      if (
        rPassword.confirmPass === "" ||
        rPassword.confirmPass !== rPassword.password
      ) {
        setValiPassCF(false);
      } else {
        setValiPassCF(true);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Đặt Lại Mật Khẩu</title>
      </Helmet>
      <section className="page-section" id="contact">
        <div className="container card-final-register d-flex justify-content-center">
          <div className="card w-50 text-center">
            <div className="card-header text-uppercase font-weight-bold text bg-secondary text-light">
              Đặt Lại Mật Khẩu
            </div>
            <div className="card-body">
              {message ? <Message message={message} /> : null}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="font-weight-bold text-secondary">
                    Mật Khẩu mới
                  </label>
                  <p className={valiPass === false ? "onVali" : "offVali"}>
                    <i>Vui lòng nhập mật khẩu và từ 6 ký tự trở lên</i>
                  </p>
                  <input
                    name="password"
                    value={rPassword.password}
                    onChange={onChange}
                    type="password"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div className="form-group">
                  <label className="font-weight-bold text-secondary">
                    Xác Nhận Mật Khẩu
                  </label>
                  <p className={valiPassCF === false ? "onVali" : "offVali"}>
                    <i>Mật khẩu không khớp</i>
                  </p>
                  <input
                    name="confirmPass"
                    value={rPassword.confirmPass}
                    onChange={onChange}
                    type="password"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>

                <button className="btn btn-lg btn-primary font-weight-bold">
                  Hoàn Tất
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPass;
