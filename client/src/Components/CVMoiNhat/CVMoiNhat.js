import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import RecruimentService from "../../Services/RecruimentService";
import CVMoiNhatItem from "./CVMoiNhatItem";

function CVMoiNhat(props) {
  const [recruitments, setRecruitments] = useState([]);
  const { user } = useContext(AuthContext);
  const [skip, setSkip] = useState(0);
  const [totalRcm, setTotalRcm] = useState(0);
  const [animationLoadMore, setAnimationLoadMore] = useState(0);
  const [dem, setdem] = useState(1);

  useEffect(() => {
    const variable = {
      skip: skip,
    };
    getRecruitment(variable);
  }, []);

  const getRecruitment = (variable) => {
    RecruimentService.loadRecruitment(variable).then((data) => {
      setRecruitments([...recruitments, data.rcm]);
      setTotalRcm(data.total);
    });
  };

  const newRecruitment = [...recruitments];

  const renderListCV = newRecruitment.map((recruitment, index) => (
    <CVMoiNhatItem
      user={user}
      recruitment={recruitment}
      key={index}
      index={index}
    />
  ));

  const loadMore = () => {
    const Skip = skip + 3;
    const Dem = dem + 1;
    const variable = {
      skip: Skip,
    };

    const top = animationLoadMore + 2345;

    window.scrollTo({ top: top, behavior: "smooth" });

    getRecruitment(variable);
    setSkip(Skip);
    setAnimationLoadMore(top);
    setdem(Dem);
  };

  const totalLoadmore = Math.ceil(totalRcm / 3);

  return (
    <>
      <section className="page-section portfolio text-white bg-primary">
        <div className="container">
          {/* Portfolio Section Heading*/}
          <h2 className="page-section-heading text-center text-uppercase text-white mb-0 no-select">
            công việc mới nhất
          </h2>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          {totalRcm === 0 ? (
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
                  className="text-light text-uppercase display-4 font-weight-bold"
                >
                  😭😭😭 Thất Nghiệp Rồi 😭😭😭
                </span>
              </div>
            </>
          ) : null}
          <div className="row">{renderListCV}</div>
          {totalRcm <= 3 || dem === totalLoadmore ? null : (
            <div className="row">
              <div className="col mx-auto d-flex justify-content-center">
                <i
                  className="icon fas fa-chevron-down loadMore"
                  onClick={loadMore}
                ></i>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CVMoiNhat;
