import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
const StyleExpGraph = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 160px;
  max-width: 240px;
  width: 100%;
`;
export default function Graph() {
  const [state, setState] = useState({
    series: [],
    ratio: [],
    options: {
      chart: {
        type: "pie",
        width: 380,
        events: {
          dataPointSelection: () => {}, // 클릭 무력화
        },
      },
      labels: [],
      colors: ["#4FADF7", "#70D6FF", "#FFD670", "#FF9770", "#9D79BC"],
      tooltip: {
        theme: "light",
        fillSeriesColor: false,
        style: {
          fontSize: "11px",
          fontWeight: "600",
        },
        marker: {
          show: false,
        },
        y: {
          formatter: () => "", // 초기화 시 빈 문자열
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "11px",
          fontWeight: "300",
          colors: ["#fff"],
        },
        formatter: (_, options) => {
          const label = options?.w?.config?.labels?.[options.seriesIndex] ?? "";
          return label;
        },
        dropShadow: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          customScale: 1,
          dataLabels: {
            offset: -10,
          },
        },
      },
      states: {
        hover: {
          filter: {
            type: "lighten",
            value: 0.25,
          },
        },
        active: {
          filter: { type: "none" },
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      legend: {
        show: false,
      },
    },
  });
  useEffect(() => {
    const dummySeries = [50000, 30000, 20000, 15000];
    const dummyLabels = ["식비", "교통", "문화생활", "기타"];
    const dummyRatio = [35, 25, 15, 15];

    const updatedOptions = {
      ...state.options,
      labels: dummyLabels,
      tooltip: {
        ...state.options.tooltip,
        y: {
          formatter: (_, options) => {
            const percent = dummyRatio?.[options.seriesIndex] ?? 0;
            return ` ${percent}%`;
          },
        },
      },
      dataLabels: {
        ...state.options.dataLabels,
        formatter: (_, options) => {
          const label = dummyLabels?.[options.seriesIndex] ?? "";
          return label;
        },
      },
    };

    setState({
      series: dummySeries,
      ratio: dummyRatio,
      options: updatedOptions,
    });
    // axios
    //   .post(
    //     "/api/chart",
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     const newSeries = res.data.series;
    //     const newLabels = res.data.labels;
    //     const newRatio = res.data.ratio;
    //     const updatedOptions = {
    //       ...state.options,
    //       labels: newLabels,
    //       tooltip: {
    //         ...state.options.tooltip,
    //         y: {
    //           formatter: (_, options) => {
    //             //const label = newLabels?.[options.seriesIndex] ?? "";
    //             const percent = newRatio?.[options.seriesIndex] ?? 0;
    //             return ` ${percent}%`;
    //           },
    //         },
    //       },
    //       dataLabels: {
    //         ...state.options.dataLabels,
    //         formatter: (_, options) => {
    //           const label = newLabels?.[options.seriesIndex] ?? "";
    //           return label;
    //         },
    //       },
    //     };
    //     setState({
    //       series: newSeries,
    //       ratio: newRatio,
    //       options: updatedOptions,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("실패:", err);
    //   });
  }, []);

  return (
    <StyleExpGraph>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
        width={200}
      />
    </StyleExpGraph>
  );
}