import React, { useEffect, useContext, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Context/AuthContext";
import RecruimentService from "../../Services/RecruimentService";
import CVNoiBatItem from "./CVNoiBatItem";
import "./index.css";

function CVNoiBat() {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 2000,
    });
  }, []);

  const [recruitments, setRecruitments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    RecruimentService.loadRecruitmentFavourite().then((data) => {
      setRecruitments(data.rcm);
    });
  }, []);

  const newRecruitment = [...recruitments];

  const renderListCV = newRecruitment.map((recruitment, index) => (
    <CVNoiBatItem
      user={user}
      recruitment={recruitment}
      key={index}
      index={index}
    />
  ));

  return (
    <>
      <section className="page-section portfolio bg-nb" id="portfolio">
        <div className="container" data-aos="flip-left">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0 no-select">
            công việc nổi bậc
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>
          {recruitments.length < 1 ? (
            <>
              <div className="d-flex justify-content-center">
                <img
                  style={{ maxHeight: "200px" }}
                  alt="empty"
                  src={"assets/img/broke.svg"}
                />
              </div>
              <div className="d-flex justify-content-center mt-2">
                <span
                  role="img"
                  aria-label="emoji"
                  className="text-secondary text-uppercase display-4 font-weight-bold"
                >
                  😭😭😭 Thất Nghiệp Rồi 😭😭😭
                </span>
              </div>
            </>
          ) : null}
          <div className="row">{renderListCV}</div>
        </div>
      </section>
    </>
  );
}

export default CVNoiBat;
