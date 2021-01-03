import React from "react";

// import { Container } from './styles';

function Footer() {
  return (
    <>
      <footer className="footer text-center">
        <div className="container">
          <div className="row d-flex justify-content-center">
            {/* Footer Location*/}
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">đại học nam cần thơ</h4>
              <p className="lead mb-0">
                168, Nguyễn Văn Cừ, P. An Bình,
                <br />
                Quận Ninh Kiều, Thành phố Cần Thơ
              </p>
            </div>
            {/* Footer Social Icons*/}
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-uppercase mb-4">liên quan</h4>
              <a className="btn btn-outline-light btn-social mx-1" href="#!">
                <i className="fab fa-fw fa-facebook-f" />
              </a>
              <a className="btn btn-outline-light btn-social mx-1" href="#!">
                <i className="far fa-chart-bar"></i>
              </a>
              <a className="btn btn-outline-light btn-social mx-1" href="#!">
                <i className="fab fa-fw fa-internet-explorer" />
              </a>
            </div>
            {/* Footer About Text*/}
            <div className="col-lg-4">
              <h4 className="text-uppercase mb-4">đồ án chuyên ngành</h4>
              <p className="lead mb-0">
                Giảng viên hướng dẫn: Võ Văn Phúc
                <br />
                Nhóm thực hiện: Quốc Liêm, Nhật Linh
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* Copyright Section*/}
      <div className="copyright py-4 text-center text-white">
        <div className="container">
          <small>Copyright © Your Website 2020</small>
        </div>
      </div>
    </>
  );
}

export default Footer;
