import React from "react";
import Header from "../Header/Header";
import CVNoiBat from "../CVNoiBat/CVNoiBat";
import CVMoiNhat from "../CVMoiNhat/CVMoiNhat";
import "./index.css";
import MyHelmet from "../Helmet/MyHelmet";

function Home() {
  return (
    <>
      <MyHelmet
        title="Tuyển Dụng Miền Nam - Trang Chủ"
        description="Tìm kiếm việc làm online - không có gì quan trọng hơn là tuyển dụng và phát triển các tài năng"
      />
      <div className="main">
        <Header />
        <CVNoiBat />
        <CVMoiNhat />
      </div>
    </>
  );
}

export default Home;
