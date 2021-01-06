import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { AuthContext } from "../../Context/AuthContext";
import AccountService from "../../Services/AccountService";
import Message from "../Message/Message";
import { Helmet } from "react-helmet";

function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(false);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = () => {
    props.history.goBack();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AccountService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        // props.history.push("/");
        goBack();
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Đăng Nhập</title>
      </Helmet>
      <section className="page-section my-3 login">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Đăng Nhập
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
              {message ? <Message message={message} /> : null}
              <form
                id="contactForm"
                name="sentMessage"
                noValidate="novalidate"
                onSubmit={onSubmit}
              >
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <input
                      className="form-control"
                      name="username"
                      type="text"
                      placeholder="Username"
                      onChange={onChange}
                      autoFocus={true}
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Mật Khẩu</label>
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      onChange={onChange}
                      placeholder="Mật Khẩu"
                    />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <br />
                <div id="success" />
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-xl"
                    id="sendMessageButton"
                    type="submit"
                  >
                    Đăng Nhập
                  </button>
                </div>
                <div className="form-group">
                  <p className="text-login">
                    Bạn chưa có tài khoản - <a href="/register">Đăng Ký</a>
                  </p>
                </div>
                <div className="form-group">
                  <p className="text-login">
                    Bạn đã <a href="/forgetPass">quên mật khẩu</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
