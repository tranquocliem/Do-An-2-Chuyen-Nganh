import React from "react";
import Header from "../Header/Header";
import CVNoiBat from "../CVNoiBat/CVNoiBat";
import CVMoiNhat from "../CVMoiNhat/CVMoiNhat";
import "./index.css";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>Trang Chủ - Tuyển Dụng</title>
      </Helmet>
      <div className="main">
        <Header />
        <CVNoiBat />
        <CVMoiNhat />
      </div>
    </>
  );
}

export default Home;
