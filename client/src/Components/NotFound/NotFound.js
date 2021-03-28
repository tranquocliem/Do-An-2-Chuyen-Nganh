import React, { useEffect } from "react";
import "./index.css";
import MyHelmet from "../Helmet/MyHelmet";

function NotFound(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <MyHelmet title="Not Found" description="Trang này không tồn tại" />

      <section className="page-section my-3 search">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Not Found
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              {/* <p
                className="d-flex justify-content-center not-found text-uppercase"
                style={{
                  color: "#1d365ac7",
                  fontWeight: "bold",
                }}
              >
                😖😖 Trang Không Tồn Tại 😫😫
              </p> */}
              <img src={"assets/img/404.svg"} className="not-found" alt="404" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
