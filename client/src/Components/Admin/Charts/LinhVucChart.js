import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";

import { Helmet } from "react-helmet";
import AdminService from "../../../Services/AdminService";

function LinhVucChart() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    processingData();
  }, []);

  const tooltip = React.useMemo(
    () => ({
      render: ({ datum, primaryAxis, getStyle }) => {
        return <CustomTooltip {...{ getStyle, primaryAxis, datum }} />;
      },
    }),
    []
  );

  const processingData = async () => {
    const data = await AdminService.loadRecruitmentTrue();
    // [{label: "...", data:[]}, ...]
    const { rcm } = data;
    const crHash = {};
    const getMonth = (isoStr) => {
      const date = new Date(isoStr);
      return date.getMonth();
    };
    for (let r of rcm) {
      if (crHash[r.career._id] === undefined) {
        crHash[r.career._id] = {
          label: r.career.name,
          data: Array(12)
            .fill(null)
            .map((_, i) => ({
              primary: `Tháng ${i + 1}`,
              secondary: 0,
            })),
        };
        crHash[r.career._id].data[getMonth(r.createdAt)].secondary += 1;
      } else crHash[r.career._id].data[getMonth(r.createdAt)].secondary += 1;
    }
    const dt = Object.keys(crHash).map((k) => ({
      ...crHash[k],
      // data: crHash[k].data.filter((d) => d.secondary > 0),
    }));

    setdata(dt);
  };

  return (
    <>
      <Helmet>
        <title>Thống Kê Tin Tuyển Dụng</title>
      </Helmet>
      <section
        className="page-section my-3 search no-select"
        style={{ minHeight: "450px" }}
      >
        <div className="container no-select">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Thống Kê Tin Tuyển Dụng
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>
        </div>
        <br />
        {data.length && (
          <div
            className="row w-50 mx-auto"
            style={{
              height: "400px",
            }}
          >
            <Chart
              data={data}
              series={{
                type: "bar",
              }}
              axes={[
                {
                  primary: true,
                  position: "bottom",
                  type: "ordinal",
                },
                {
                  position: "left",
                  type: "linear",
                  stacked: true,
                  hardMin: 0,
                },
              ]}
              primaryCursor
              tooltip={tooltip}
            />
          </div>
        )}
      </section>
    </>
  );
}

function CustomTooltip({ getStyle, primaryAxis, datum }) {
  const data = React.useMemo(
    () =>
      datum
        ? [
            {
              data: datum.group.map((d) => ({
                primary: d.series.label,
                secondary: d.secondary,
                color: getStyle(d).fill,
              })),
            },
          ]
        : [],
    [datum, getStyle]
  );
  return datum ? (
    <div
      style={{
        color: "white",
        pointerEvents: "none",
      }}
    >
      <h3
        style={{
          display: "block",
          textAlign: "center",
        }}
      >
        {primaryAxis.format(datum.primary)}
      </h3>
      <div
        style={{
          width: "300px",
          height: "200px",
          display: "flex",
        }}
      >
        <Chart
          data={data}
          dark
          series={{ type: "bar" }}
          axes={[
            {
              primary: true,
              position: "bottom",
              type: "ordinal",
            },
            {
              position: "left",
              type: "linear",
              hardMin: 0,
            },
          ]}
          getDatumStyle={(datum) => ({
            color: datum.originalDatum.color,
          })}
          primaryCursor={{
            value: datum.seriesLabel,
          }}
        />
      </div>
    </div>
  ) : null;
}

export default LinhVucChart;
