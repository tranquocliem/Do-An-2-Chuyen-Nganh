import React, { useState, useEffect, useRef } from "react";
import AccountService from "../../Services/AccountService";
import Message from "../Message/Message";
import { Helmet } from "react-helmet";
import { Spinner } from "react-bootstrap";

function ForgetPass(props) {
  const [email, setEmail] = useState("");
  const [valiem, setValiEm] = useState(true);
  const [valiEmail, setValiEmail] = useState(true);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(false);

  let timeID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeID);
    };
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const Reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const onSubmit = (e) => {
    const testEmail = new RegExp(Reg).test(email);
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
    if (testEmail && email !== "") {
      setPending(true);
      setValiEmail(true);
      setValiEm(true);
      const variable = {
        email,
      };
      AccountService.forgetPass(variable).then((data) => {
        const { message } = data;
        setMessage(message);

        if (message) {
          setPending(false);
        }
        if (!message.msgError) {
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
      if (email === "") {
        setValiEm(false);
      } else {
        setValiEm(true);
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Quên Mật Khẩu</title>
      </Helmet>
      <section className="page-section my-3 register">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Quên Mật Khẩu
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>

          <div className="row" style={{ minHeight: 350 }}>
            <div className="col-lg-8 mx-auto my-5">
              {message ? <Message message={message} /> : null}
              <form
                id="contactForm"
                name="sentMessage"
                noValidate="novalidate"
                onSubmit={onSubmit}
              >
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>E-mail</label>
                    <p className={!valiem || !valiEmail ? "onVali" : "offVali"}>
                      <i>Vui lòng nhập email và hợp lệ</i>
                    </p>
                    <input
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={onChange}
                      placeholder="E-Mail"
                      type="email"
                    />
                  </div>
                </div>

                <br />
                <div id="success" />
                <div className="form-group text-center">
                  <button
                    className="btn btn-primary btn-xl"
                    id="sendMessageButton"
                    type="submit"
                  >
                    Thực hiện
                  </button>
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

export default ForgetPass;
