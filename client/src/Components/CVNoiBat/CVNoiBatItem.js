import React from "react";
import moment from "moment";
import "moment/locale/vi";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import chuyenDoiURL from "../../Shared/ChuyenDoiURL";

function CVNoiBatItem(props) {
  console.log(props);
  let luong = props.recruitment.salary;
  const dateCre = moment(props.recruitment.createdAt).format(
    "DD/MM/YYYY h:mm:ss"
  );

  let images = props.recruitment.img.map((item) => ({
    original: item,
    thumbnail: item,
  }));

  luong = luong.toLocaleString("it-IT");
  const user = props.user;

  // console.log(props.recruitment);

  return (
    <>
      <div className="col-md-6 col-lg-4 mb-5">
        <div className="card card-NB w-100 h-100" style={{ width: "18rem" }}>
          {user.role ? (
            user.role === "admin" || user.role === "spadmin" ? (
              <div className="dropdown menu-recruitment">
                <i
                  className="fas fa-bars"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></i>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <Link
                    to={`/updateRecruitment/${props.recruitment._id}`}
                    className="dropdown-item"
                  >
                    Cập Nhật
                  </Link>
                </div>
              </div>
            ) : user._id === props.recruitment.writer ? (
              <div className="dropdown menu-recruitment">
                <i
                  className="fas fa-bars"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></i>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <Link
                    to={`/updateRecruitment/${props.recruitment._id}`}
                    className="dropdown-item"
                  >
                    Cập Nhật
                  </Link>
                </div>
              </div>
            ) : null
          ) : null}
          <div className="p-2 img" style={{ height: "150px" }}>
            <ImageGallery
              items={images}
              autoPlay
              showNav={false}
              showThumbnails={false}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </div>
          <div className="card-body mt-2">
            <h5 className="card-title cvNB-item-sumary">
              <Link
                to={`/recruitment/${chuyenDoiURL(props.recruitment.title)}/${
                  props.recruitment._id
                }`}
                className="cvNB-title"
              >
                {props.recruitment.title}
              </Link>
            </h5>
            <p className="card-text cvNB-salary">
              <span>
                <i className="fas fa-money-bill-wave px-1"></i>
                {luong + " VNĐ"}
              </span>
              <span className="mx-2"></span>
              <span>
                <i className="fas fa-map-marker-alt px-1"></i>
                <Link
                  to={`/${props.recruitment.city._id}/search=${chuyenDoiURL(
                    props.recruitment.city.name
                  )}`}
                >
                  {props.recruitment.city.name}
                </Link>
              </span>
              <br />
              <span>
                <i className="fas fa-clock px-1"></i>
                <i>{dateCre}</i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVNoiBatItem;
