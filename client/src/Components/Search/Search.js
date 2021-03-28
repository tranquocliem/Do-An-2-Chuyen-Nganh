import React, { useEffect, useState } from "react";
import "./index.css";
import RecruitmentItem from "./RecruitmentItem";
import RecruimentService from "../../Services/RecruimentService";
import CityService from "../../Services/CityService";
import CareerService from "../../Services/CareerService";
import ListCity from "./ListCity";
import ListCareer from "./ListCareer";
import MyHelmet from "../Helmet/MyHelmet";

function Search(props) {
  const [recruitmentSearch, setrecruitmentSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [skip, setSkip] = useState(0);
  const [exist, setExist] = useState(true);
  const [total, setTotal] = useState(0);
  const [animationLoad, setAnimationLoad] = useState(0);
  const [cities, setCities] = useState([]);
  const [careers, setCareers] = useState([]);
  const [dem, setdem] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0.1, behavior: "smooth" });

    CityService.getCity().then((data) => {
      if (data.success) {
        setCities(data.ct);
      }
    });

    CareerService.getCareer().then((data) => {
      if (data.success) {
        setCareers(data.cv);
      }
    });
  }, []);

  //hàm được gọi api theo searchTerm
  const getRecruitment = (variable) => {
    RecruimentService.searchRecruitment(variable).then((data) => {
      const { result, exist, total } = data;

      setrecruitmentSearch([...recruitmentSearch, result]);
      setExist(exist);
      setTotal(total);
    });
  };

  //change giá trị input search
  const onChangeInputSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  //sự kiện click search
  const onSearch = (e) => {
    e.preventDefault();
    const variable = {
      searchTerm: searchTerm,
      skip: 0,
    };

    if (searchTerm) {
      setSkip(0);
      recruitmentSearch.splice(0, recruitmentSearch.length); //xoá từ mãng đến hết mục đích dùng để load lại khi tìm kiếm
      getRecruitment(variable);
      window.scrollTo({ top: 14.5, behavior: "smooth" });
    } else {
      setrecruitmentSearch([]);
      setExist(true);
      window.scrollTo({ top: 0.1, behavior: "smooth" });
    }
  };

  const newRcmSearch = [...recruitmentSearch];

  //render list search
  const renderList = newRcmSearch.map((recruitment, index) => (
    <RecruitmentItem recruitment={recruitment} key={index} />
  ));

  //sự kiện loadmore
  const loadMore = () => {
    const Skip = skip + 3;
    const Dem = dem + 1;

    const variable = {
      searchTerm: searchTerm,
      skip: Skip,
    };

    const top = animationLoad + 450;

    window.scrollTo({ top: top, behavior: "smooth" });

    getRecruitment(variable);

    setSkip(Skip);
    setdem(Dem);
    setAnimationLoad(top);
  };

  const totalLoadMore = Math.ceil(total / 3); //tổng số trang

  const newCities = [...cities];
  const newCarrers = [...careers];

  const renderListCity = newCities.map((item, i) => (
    <ListCity city={item} key={i} />
  ));

  const renderListCareer = newCarrers.map((item, i) => (
    <ListCareer career={item} key={i} />
  ));

  return (
    <>
      <MyHelmet title="Tìm kiếm" description="Tìm kiếm việc làm online" />
      <section className="page-section my-3 search">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Tìm kiếm
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
              <form
                className="form-inline mb-2"
                noValidate="novalidate"
                id="contactForm"
                onSubmit={onSearch}
              >
                <div className="control-group w-100 ">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2 w-100 row mx-auto">
                    <input
                      name="search"
                      id="search-input"
                      className="form-control mr-sm-2 no-select"
                      style={{ width: "calc(100%-44px)" }}
                      type="search"
                      placeholder="Nhập công việc cần tìm"
                      autoFocus
                      value={searchTerm}
                      onChange={onChangeInputSearch}
                    />
                    <button
                      className="btn btn-outline-success my-2 my-sm-0"
                      type="submit"
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {recruitmentSearch.length < 1 ? (
            <>
              <div className="row mt-5 mb-5 no-select">
                <div className="col d-flex justify-content-center">
                  <img
                    src="assets/img/search.png"
                    alt="search"
                    className="img-search"
                    style={{
                      maxWidth: "15%",
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="mt-3 text-center text-secondary" style={{}}>
                Công Việc Cần Tìm
              </h3>
              <div className="row" style={{ paddingBottom: "-50px" }}>
                {renderList}
              </div>
              {dem === totalLoadMore || total <= 3 ? null : (
                <div className="row">
                  <div className="col mx-auto d-flex justify-content-center">
                    <i
                      className="icon fas fa-chevron-down loadMore"
                      onClick={loadMore}
                    ></i>
                  </div>
                </div>
              )}
            </>
          )}
          {exist ? null : (
            <h3
              className="text-center text-secondary mt-3"
              style={{ opacity: 0.5, fontWeight: "bold" }}
            >
              <span role="img" aria-label="emoji">
                🙄🙄🙄~Không Tồn Tại~😩😩😩
              </span>
            </h3>
          )}

          <div className="row text-uppercase text-secondary d-flex justify-content-center mb-3 mt-5 mx-auto">
            <h2>Tìm Kiếm Nhanh</h2>
          </div>
          <div className="row d-fex justify-content-center mb-2 mx-auto">
            <div className="card mx-auto mb-3" style={{ width: "20rem" }}>
              <div className="card-header bg-secondary text-light">
                Thành Phố
              </div>
              <div
                className="body-list-search"
                style={{ height: "260px", overflowY: "scroll" }}
              >
                <ul className="list-group list-group-flush">
                  {renderListCity}
                </ul>
              </div>
            </div>
            <div className="card mx-auto mb-3" style={{ width: "20rem" }}>
              <div className="card-header bg-secondary text-light">
                Ngành Nghề
              </div>
              <div
                className="body-list-search"
                style={{ height: "260px", overflowY: "scroll" }}
              >
                <ul className="list-group list-group-flush">
                  {renderListCareer}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="page-section my-3 search">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Danh Sach Ho So
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>
          <div id="accordion">
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-header">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#item1"
                  >
                    Collapsible Group Item #1
                  </button>
                </div>
                <div id="item1" className="collapse" data-parent="#accordion">
                  <div className="card-body">
                    <p>
                      Ho va Ten: Tran Quoc Liem {<br />} Nam Sinh: 15/09/1999
                      {<br />} SDT: 0782872822 {<br />} E-mail:
                      tranquocliemc6@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-header">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#item2"
                  >
                    Collapsible Group Item #2
                  </button>
                </div>
                <div id="item2" className="collapse" data-parent="#accordion">
                  <div className="card-body">
                    <p>
                      Ho va Ten: Tran Quoc Liem {<br />} Nam Sinh: 15/09/1999
                      {<br />} SDT: 0782872822 {<br />} E-mail:
                      tranquocliemc6@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-header">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#item3"
                  >
                    Collapsible Group Item #3
                  </button>
                </div>
                <div id="item3" className="collapse" data-parent="#accordion">
                  <div className="card-body">
                    <p>
                      Ho va Ten: Tran Quoc Liem {<br />} Nam Sinh: 15/09/1999
                      {<br />} SDT: 0782872822 {<br />} E-mail:
                      tranquocliemc6@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default Search;
