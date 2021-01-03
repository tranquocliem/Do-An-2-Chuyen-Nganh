import React, { useState, useEffect, useRef } from "react";
import AccountService from "../../Services/AccountService";
import "./index.css";
import Message from "../Message/Message";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";

function Register(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    // password: "",
    // passwordConfig: "",
  });

  const [valiRole, setValiRole] = useState(true);
  const [valiem, setValiEm] = useState(true);
  const [valiUs, setValiUs] = useState(true);
  const [pending, setPending] = useState(false);
  // const [valiPass, setValiPass] = useState(true);
  // const [valiPassCF, setValiPassCF] = useState(true);

  let timeID = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeID);
    };
  }, []);

  const [message, setMessage] = useState(false);
  const [valiEmail, setValiEmail] = useState(true);

  const resetForm = () => {
    // setUser({ username: "", password: "", email: "", passwordConfig: "" });
    setUser({
      username: "",
      email: "",
      role: "",
    });
    setValiEm(true);
    setValiUs(true);
    // setValiPass(true);
    // setValiPassCF(true);
  };

  const onChange = (e) => {
    e.preventDefault();
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
    // const pw = newUser.password;
    // const em = newUser.email;
    // const usn = newUser.username;
    // const pwc = newUser.passwordConfig;

    // //kiểm tra password
    // if (pw !== "") {
    //   if (pw.length + 1 > 6) {
    //     setValiPass(true);
    //   } else {
    //     setValiPass(false);
    //   }
    // } else {
    //   setValiPass(false);
    // }

    // if (pwc !== "") {
    //   setValiPassCF(true);
    // }

    // //kiểm tra email
    // if (em !== "") {
    //   setValiEm(true);
    // } else {
    //   setValiEm(false);
    // }

    // //kiêm tra username
    // if (usn !== "") {
    //   if (usn.length + 1 > 3) {
    //     setValiUs(true);
    //   } else {
    //     setValiUs(false);
    //   }
    // } else {
    //   setValiUs(false);
    // }
  };

  const Reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const onSubmit = (e) => {
    const testEmail = new RegExp(Reg).test(user.email);
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
    if (
      testEmail &&
      user.role !== "" &&
      user.username !== "" &&
      user.username.length + 1 > 3 &&
      // user.password !== "" &&
      // user.password.length + 1 > 6 &&
      // user.passwordConfig === user.password &&
      user.email !== ""
      // user.passwordConfig !== ""
    ) {
      setPending(true);
      setValiEmail(true);
      setValiRole(true);
      setValiUs(true);
      setValiEm(true);
      // setValiPass(true);
      // setValiPassCF(true);
      AccountService.sendMail(user).then((data) => {
        const { message } = data;
        setMessage(message);

        if (message) {
          setPending(false);
        }
        if (!message.msgError) {
          resetForm();
          console.log(user);
          timeID = setTimeout(() => {
            props.history.push("/e-mail/activate");
          }, 2500);
          setMessage(message);
        }
      });
    } else {
      if (!testEmail) {
        setValiEmail(false);
      } else {
        setValiEmail(true);
      }
      if (user.role === "") {
        setValiRole(false);
      } else {
        setValiRole(true);
      }
      if (user.username === "" || user.username.length + 1 < 3) {
        setValiUs(false);
      } else {
        setValiUs(true);
      }
      // if (user.password === "" || user.password.length + 1 < 6) {
      //   setValiPass(false);
      // } else {
      //   setValiPass(true);
      // }
      // if (user.passwordConfig === "" || user.passwordConfig !== user.password) {
      //   setValiPassCF(false);
      // } else {
      //   setValiPassCF(true);
      // }
      if (user.email === "") {
        setValiEm(false);
      } else {
        setValiEm(true);
      }
    }
  };

  // console.log(new RegExp(Temp).test(user.email));
  return (
    <>
      <Helmet>
        <title>Đăng Ký</title>
      </Helmet>
      <section className="page-section my-3 register">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Đăng Ký
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>

          <div className="row">
            <div className="col-lg-8 mx-auto">
              {/* {valiEmail === false ? (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>E-mail không hợp lệ!</strong> Bạn có thể theo mẩu sau
                  test@gmail.com.
                  <button
                    style={{ outline: "none" }}
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              ) : null} */}
              {message ? <Message message={message} /> : null}
              <form
                id="contactForm"
                name="sentMessage"
                noValidate="novalidate"
                onSubmit={onSubmit}
              >
                <div className="control-group">
                  <div className="form-group controls mb-0 pb-2">
                    <p className={valiRole === false ? "onVali" : "offVali"}>
                      <i>Vui lòng nhập chọn loại tài khoản</i>
                    </p>
                    <select
                      className="form-control"
                      name="role"
                      value={user.role}
                      onChange={onChange}
                    >
                      <option value="" disabled>
                        {" "}
                        -- Chọn Loại Tài Khoản --
                      </option>
                      <option value="candidate">Ứng Viên</option>
                      <option value="recruiter">Tuyển Dụng</option>
                    </select>
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Username</label>
                    <p className={valiUs === false ? "onVali" : "offVali"}>
                      <i>Vui lòng nhập username và từ 3 kí tự trở lên</i>
                    </p>
                    <input
                      className="form-control"
                      name="username"
                      type="text"
                      placeholder="User Name"
                      autoFocus={true}
                      value={user.username}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>E-mail</label>
                    <p className={!valiem || !valiEmail ? "onVali" : "offVali"}>
                      <i>Vui lòng nhập email và hợp lệ</i>
                    </p>
                    <input
                      name="email"
                      className="form-control"
                      value={user.email}
                      onChange={onChange}
                      placeholder="E-Mail"
                      type="email"
                    />
                  </div>
                </div>
                {/* <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Mật Khẩu</label>
                    <p className={valiPass === false ? "onVali" : "offVali"}>
                      <i>Vui lòng nhập mật khẩu và từ 6 ký tự trở lên</i>
                    </p>
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      onChange={onChange}
                      placeholder="Mật Khẩu"
                    />
                  </div>
                </div> */}
                {/* <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Mật Khẩu</label>
                    <p className={valiPassCF === false ? "onVali" : "offVali"}>
                      <i>
                        Vui lòng nhập lại mật khẩu và khóp với mật khẩu trên
                      </i>
                    </p>
                    <input
                      className="form-control"
                      name="passwordConfig"
                      type="password"
                      onChange={onChange}
                      placeholder="Nhập Lại Mật Khẩu"
                    />
                  </div>
                </div> */}
                <br />
                <div id="success" />
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-xl"
                    id="sendMessageButton"
                    type="submit"
                  >
                    Đăng Ký
                  </button>
                </div>
                <div className="form-group">
                  <p className="text-register">
                    Bạn đã có tài khoản <a href="/login">Đăng Nhập</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div
        className="pending no-select"
        style={pending ? { display: "flex" } : { display: "none" }}
      >
        <div className="spinner-loading font-weight-bold">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <br />
          <p>Đang Xử Lý Vui Lòng Chờ!</p>
        </div>
      </div>
    </>
  );
}
export default Register;
