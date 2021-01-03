import React, { useState, useEffect, useRef } from "react";
import AccountService from "../../Services/AccountService";
import "./index.css";
import Message from "../Message/Message";
import { Helmet } from "react-helmet";

function FinalRegister(props) {
  const [user, setUser] = useState({
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
    setUser({
      token: props.match.params.token,
      password: "",
      confirmPass: "",
    });
    setValiPass(true);
    setValiPassCF(true);
  };

  const onChange = (e) => {
    e.preventDefault();
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };
  console.log(user);

  const onSubmit = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
    if (
      user.password !== "" &&
      user.password.length + 1 > 6 &&
      user.confirmPass === user.password &&
      user.confirmPass !== ""
    ) {
      setValiPass(true);
      setValiPassCF(true);
      AccountService.register(user).then((data) => {
        const { message } = data;
        setMessage(message);

        if (!message.msgError) {
          resetForm();
          console.log(user);
          timeID = setTimeout(() => {
            props.history.push("/login");
          }, 2500);
          setMessage(message);
        }
      });
    } else {
      if (user.password === "" || user.password.length + 1 < 6) {
        setValiPass(false);
      } else {
        setValiPass(true);
      }
      if (user.confirmPass === "" || user.confirmPass !== user.password) {
        setValiPassCF(false);
      } else {
        setValiPassCF(true);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Hoàn Tất Đăng Ký</title>
      </Helmet>
      <section className="page-section" id="contact">
        <div className="container card-final-register d-flex justify-content-center">
          <div className="card w-50 text-center">
            <div className="card-header text-uppercase font-weight-bold text bg-secondary text-light">
              Hoàn Tất Đăng Ký
            </div>
            <div className="card-body">
              {message ? <Message message={message} /> : null}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="font-weight-bold text-secondary">
                    Mật Khẩu
                  </label>
                  <p className={valiPass === false ? "onVali" : "offVali"}>
                    <i>Vui lòng nhập mật khẩu và từ 6 ký tự trở lên</i>
                  </p>
                  <input
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    type="password"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Nhập mật khẩu"
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
                    value={user.confirmPass}
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

export default FinalRegister;
