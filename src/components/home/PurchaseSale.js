import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Button, Image } from "react-bootstrap";
import filterBlue from "../../assets/images/icons/filterBlue.svg";
import cancel from "../../assets/images/icons/cancel.svg";
import "../../assets/css/responsive.css";

const PurchaseSale = () => {
  const options = {
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: "100%",
      width: "100%",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: true,
      },
      items: {
        display: "flex",
      },
      fixed: {
        enabled: true,
        position: "top",
        offsetX: 0,
        offsetY: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: "#171D25",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: "#171D25",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return "$" + val;
        },
      },
    },
    colors: ["rgba(0, 100, 250, 0.4)", "rgba(0, 100, 250, 0.4)"],
    grid: {
      borderColor: " #E1E1FB",
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };
  const series = [
    {
      name: "Net Profit",
      data: [250, 500, 750, 1000, 250, 500, 750, 1000, 250, 500, 750, 1000],
    },
  ];
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [chartHeight, setchartHeight] = useState(430);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    if (windowSize[0] >= 1200) {
      setchartHeight(430);
    } else if (windowSize[0] <= 1200 && windowSize[0] > 767) {
      setchartHeight(350);
    } else if (windowSize[0] <= 767 && windowSize[0] > 576) {
      setchartHeight(200);
    } else if (windowSize[0] <= 576) {
      setchartHeight(170);
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);
  return (
    <div>
      <div className="heading text-24 mb-4">My Earnings</div>
      <div className="b-chart section-main border-0">
        <div className=" d-flex justify-content-between">
          <div className="card-label rounded-4 my-2 px-2 d-flex justify-content-center bg-light">
            <label className="">2002-2003</label>
            <Image alt="gallery" src={cancel} className=" ps-1 text-primary" />
          </div>
          <Button
            variant="outline-primary"
            className=" fw-bolder bg-lightBlue px-3 booking-btn"
          >
            <Image
              alt="gallery"
              src={filterBlue}
              className=" pe-1 text-primary"
            />
            Filter
          </Button>
        </div>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={chartHeight}
        />
      </div>
    </div>
  );
};

export default PurchaseSale;
