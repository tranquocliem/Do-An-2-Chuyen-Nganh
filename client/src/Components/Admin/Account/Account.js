import React, { useState, useEffect, useContext } from "react";
import "../Account/index.css";
import { Helmet } from "react-helmet";
import "react-tabs/style/react-tabs.css";
import { AuthContext } from "../../../Context/AuthContext";
import AdminService from "../../../Services/AdminService";
import AccountTable from "../Account/AccountTable";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Account(props) {
  const [accounts, setAccounts] = useState([]);

  const defaultPage = parseInt(props.match.params.page);
  //Pagination
  const [page, setpage] = useState(defaultPage);
  const [pageNumber, setpageNumber] = useState("");
  const [totalAccounts, settotalAccounts] = useState(null);
  const { user } = useContext(AuthContext);

  //Search
  const [searchUser, setsearchUser] = useState("");

  //load ds taì khoản
  useEffect(() => {
    const variable = {
      searchTerm: searchUser,
    };

    if (searchUser) {
      AdminService.searchAcc(variable).then((data) => {
        if (data.success) {
          setAccounts(data.result);
        }
      });
    } else {
      AdminService.loadAccout(page).then((data) => {
        if (data.success) {
          setAccounts(data.result);
          settotalAccounts(data.totalAccount);
        }
      });
    }
  }, [page, searchUser]);

  const newAccounts = [...accounts];

  //search filter account
  // const filter = accounts.filter((acc) => {
  //   return acc.username.toLowerCase().includes(searchUser.toLowerCase());
  // });

  //cập nhật lại status account
  const updateStatusAcc = (id, status) => {
    const variable = {
      _id: id,
      statusAcc: !status,
    };

    const search = {
      searchTerm: searchUser,
    };
    AdminService.updateStatusAcc(variable).then((data) => {
      const { message } = data;
      if (data.success) {
        if (searchUser) {
          AdminService.searchAcc(search).then((data) => {
            if (data.success) {
              setAccounts(data.result);
            }
          });
        } else {
          AdminService.loadAccout(page).then((data) => {
            if (data.success) {
              setAccounts(data.result);
              settotalAccounts(data.totalAccount);
            }
          });
        }
        return toast.success("Thành công!!!", {
          autoClose: 3000,
        });
      } else {
        console.log(message);

        return toast.error(`${message.msgBody}`, {
          autoClose: 3000,
        });
      }
    });
  };

  //hiển thị danh sách account theo 2 loại:
  //loại 1: hiển thị hết để tìm kiếm tài khoản
  //loại 2: hiện thị theo page(phân trang)
  // const renderAccount = searchUser
  //   ? filter.map((acc, index) => (
  //       <AccountTable
  //         updateStatusAcc={updateStatusAcc}
  //         accounts={acc}
  //         index={index}
  //         key={index}
  //       />
  //     ))
  //   : newAccounts.map((acc, index) => (
  //       <AccountTable
  //         updateStatusAcc={updateStatusAcc}
  //         accounts={acc}
  //         index={index}
  //         key={index}
  //       />
  //     ));

  const renderAccount = newAccounts.map((acc, index) => (
    <AccountTable
      updateStatusAcc={updateStatusAcc}
      accounts={acc}
      index={index}
      key={index}
    />
  ));

  // tổng số trang (tổn số tài khoản / limit), hàm ceil dùng để làm tròn lên vd: 3/2 = 1.5 ceil(3/2) = 2
  const totalPage = Math.ceil(totalAccounts / 10);

  //nút lùi một trang
  const btnPreviousPage = (e) => {
    e.preventDefault();
    setpage(page - 1);
    props.history.push(`/admin/account/${user._id}&page=${page - 1}`);
  };

  //nút tới một trang
  const btnNextPage = (e) => {
    e.preventDefault();
    setpage(page + 1);
    props.history.push(`/admin/account/${user._id}&page=${page + 1}`);
  };

  //input nhập số trang muốn tới
  const handlePage = (e) => {
    e.preventDefault();
    setpageNumber(e.target.value);
  };

  //nút đến page chỉ định
  const onGoPage = (e) => {
    e.preventDefault();
    if (pageNumber) {
      if (pageNumber > 0) {
        if (pageNumber <= totalPage) {
          const page = parseInt(pageNumber);
          setpage(page);
          props.history.push(`/admin/account/${user._id}&page=${page}`);
          setpageNumber("");
        } else {
          alert("Không Có Trang Này");
        }
      } else {
        alert("Nhập Một Số Lớn 0, Không Âm Và Là Số Chẳn");
      }
      if (searchUser) {
        alert("Đang Tìm Kiếm Dữ Liệu Không Thể Chuyển Trang");
      }
    }
  };

  //lấy giá trị search
  const Search = (e) => {
    const value = e.target.value;
    setsearchUser(value);
  };

  return (
    <>
      <Helmet>
        <title>Quản Lý Tài Khoản</title>
      </Helmet>
      <ToastContainer />
      <section
        className="page-section my-3 search"
        style={{ minHeight: "450px" }}
      >
        <div className="container no-select">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Quản Lý Tài Khoản
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>
          <div className="row">
            <div className="col">
              <form className="form-inline" onSubmit={onGoPage}>
                <div class="input-group">
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
                  <div class="input-group-append">
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
                  {`Trang: ${totalAccounts === 0 ? 0 : page}/${totalPage}`}
                </button>
              </div>
              <table className="table table-striped table-dark">
                <thead>
                  <tr className="no-select text-center">
                    <th scope="col">STT</th>
                    <th scope="col">Username</th>
                    <th scope="col">Ngày Tạo</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Hành Động</th>
                  </tr>
                </thead>
                <thead>
                  <tr className="no-select text-center">
                    <th scope="col"></th>
                    <th scope="col">
                      <input
                        className="form-control"
                        placeholder="Nhập Username"
                        value={searchUser}
                        onChange={Search}
                      />
                    </th>
                  </tr>
                </thead>
                {renderAccount}
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
                disabled={true ? page <= 1 || searchUser : false}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                style={{ borderRadius: "0px" }}
                type="button"
                className="btn btn-primary"
                onClick={btnNextPage}
                disabled={true ? page >= totalPage || searchUser : false}
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

export default Account;
