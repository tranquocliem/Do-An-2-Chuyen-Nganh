import React from "react";
import { Helmet } from "react-helmet";
function GoToEmail() {
  return (
    <>
      <Helmet>
        <title>Đi đến E-mail</title>
      </Helmet>
      <section className="page-section" id="contact">
        <div className="container card-go-to-email d-flex justify-content-center">
          <div className="card w-50">
            <div className="card-header text-uppercase font-weight-bold text bg-secondary text-light">
              Lời Nhắn
            </div>
            <div className="card-body">
              <h5 className="card-title">Đã Gửi Link Thành Công !!!</h5>
              <p className="card-text">
                Hệ thống đã gửi mail đến bạn. Vui lòng đến mail của bạn để nhận
                đường link và hoàn tất quá trình đăng ký tài khoản.
              </p>
              <a href="https://mail.google.com/" className="btn btn-primary">
                <i className="fas fa-envelope"></i> Đến E-Mail Của Bạn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GoToEmail;
