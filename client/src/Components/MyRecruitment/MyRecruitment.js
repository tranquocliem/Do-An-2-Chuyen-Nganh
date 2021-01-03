import React, { useState, useEffect, useContext } from "react";
import Helmet from "react-helmet";
import "./index.css";
import RecruimentService from "../../Services/RecruimentService";
import MyTableRecruitment from "./MyTableRecruitment";
import { AuthContext } from "../../Context/AuthContext";

function MyRecruitment(props) {
  const [myRecruitments, setmyRecruitments] = useState([]);

  const defaultPage = parseInt(props.match.params.page);
  //Pagination
  const [page, setpage] = useState(defaultPage);
  const [pageNumber, setpageNumber] = useState("");
  const [totalMyRecruitment, settotalMyRecruitment] = useState(null);
  const { user } = useContext(AuthContext);

  // console.log(parseInt(props.match.params.page));
  // console.log(page);

  useEffect(() => {
    RecruimentService.loadMyRecruitment(page).then((data) => {
      if (data.success) {
        setmyRecruitments(data.result);
        settotalMyRecruitment(data.totalMyRecruitment);
      }
    });
  }, [page]);

  const newMyRecruitment = [...myRecruitments];

  const btnDeleteMyRecruitment = (id) => {
    myRecruitments.find((rcm, index) => {
      if (rcm._id === id) {
        newMyRecruitment.splice(index, 1);
        setmyRecruitments(newMyRecruitment);
        RecruimentService.loadMyRecruitment(page).then((data) => {
          if (data.success) {
            setmyRecruitments(data.result);
            settotalMyRecruitment(data.totalMyRecruitment);
          }
        });
        return true;
      } else {
        return false;
      }
    });
  };

  const renderMyRecruitment = newMyRecruitment.map((rcm, index) => (
    <MyTableRecruitment
      recruitment={rcm}
      index={index}
      key={index}
      btnDeleteMyRecruitment={btnDeleteMyRecruitment}
    />
  ));

  // tổng số trang, hàm ceil dùng để làm tròn lên vd: 3/2 = 1.5 ceil(3/2) = 2
  const totalPage = Math.ceil(totalMyRecruitment / 2);

  //lùi một trang
  const btnPreviousPage = (e) => {
    e.preventDefault();
    setpage(page - 1);
    props.history.push(`/myRecruitment/${user._id}-page=${page - 1}`);
  };

  //tới một trang
  const btnNextPage = (e) => {
    e.preventDefault();
    setpage(page + 1);
    props.history.push(`/myRecruitment/${user._id}-page=${page + 1}`);
  };

  const handlePage = (e) => {
    e.preventDefault();
    setpageNumber(e.target.value);
  };

  //đến page chỉ định
  const onGoPage = (e) => {
    e.preventDefault();
    if (pageNumber) {
      if (pageNumber > 0) {
        if (pageNumber <= totalPage) {
          const page = parseInt(pageNumber);
          setpage(page);
          props.history.push(`/myRecruitment/${user._id}-page=${page}`);
          setpageNumber("");
        } else {
          alert("Không Có Trang Này");
        }
      } else {
        alert("Không Nhập Số 0 Hoặc Âm Vào Đây");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Trang Cá Nhân</title>
      </Helmet>
      <section
        className="page-section my-3 search"
        style={{ minHeight: "450px" }}
      >
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Bài Đăng Của Tôi
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>
          {/* <div className="row">
            <div className="col ">
              <form className="form-inline mb-2" onSubmit={onGoPage}>
                <input
                  name="page"
                  value={pageNumber}
                  onChange={handlePage}
                  onKeyPress={(event) => {
                    return /\d/.test(
                      String.fromCharCode(event.keyCode || event.which)
                    );
                  }} //"return /\d/.test(String.fromCharCode(event.keyCode || event.which))"
                  className="form-control mr-sm-2 no-select"
                  type="number"
                  placeholder="Nhập Số Trang"
                  style={{ borderRadius: "0" }}
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  style={{ borderRadius: "0" }}
                  type="submit"
                >
                  Đi Đến
                </button>
              </form>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                style={{ borderRadius: "0" }}
                disabled
              >
                Trang:{" "}
                {totalMyRecruitment === 0 ? `0/0` : `${page}/${totalPage}`}
              </button>
            </div>
          </div> */}
          <div className="row">
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col">
              <form className="form-inline" onSubmit={onGoPage}>
                <div className="input-group">
                  <input
                    name="page"
                    value={pageNumber}
                    onChange={handlePage}
                    onKeyPress={(event) => {
                      return /\d/.test(
                        String.fromCharCode(event.keyCode || event.which)
                      );
                    }} //"return /\d/.test(String.fromCharCode(event.keyCode || event.which))"
                    className="form-control mr-sm-2 no-select"
                    type="number"
                    placeholder="Nhập Số Trang"
                    style={{ borderRadius: "0" }}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-success my-2 my-sm-0"
                      style={{ borderRadius: "0" }}
                      type="submit"
                    >
                      Đi Đến
                    </button>
                  </div>
                </div>
              </form>
              <div className="col d-flex justify-content-end mx-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ borderRadius: "0" }}
                  disabled
                >
                  Trang:{" "}
                  {totalMyRecruitment === 0 ? `0/0` : `${page}/${totalPage}`}
                </button>
              </div>
              <table className="table table-striped table-dark ">
                <thead>
                  <tr className="no-select text-center">
                    <th scope="col">STT</th>
                    <th scope="col">Tiêu Đề</th>
                    <th scope="col">Ngày Đăng</th>
                    <th scope="col">Trạng Thái</th>
                    <th scope="col">Hành Động</th>
                  </tr>
                </thead>
                {myRecruitments.length >= 1 ? null : (
                  <thead>
                    <tr className="no-select text-center">
                      <th scope="col" colSpan="6">
                        <img
                          style={{ maxHeight: "145px" }}
                          alt="empty"
                          src={"assets/img/inbox.svg"}
                        />
                        <h6>
                          <i>(Không còn tin nào hết)</i>
                        </h6>
                      </th>
                    </tr>
                  </thead>
                )}
                {renderMyRecruitment}
              </table>
            </div>
          </div>
          <div className="row no-select">
            <div className="col d-flex justify-content-end">
              <button
                style={{ borderRadius: "0px" }}
                type="button"
                className="btn btn-primary"
                onClick={btnPreviousPage}
                disabled={true ? page <= 1 : false}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                style={{ borderRadius: "0px" }}
                type="button"
                className="btn btn-primary"
                onClick={btnNextPage}
                disabled={true ? page >= totalPage : false}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyRecruitment;
