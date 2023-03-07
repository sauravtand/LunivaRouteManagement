import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Card, Calendar } from "antd";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import day from "../../../Assets/Images/day.jpg";
import {
  getCounterwiseTotalCollectionAmtDetailsApi,
  getRouteWiseAssignedVehicleCountDetailsApi,
} from "../../../Services/ReportService";
import moment from "moment";
import { dateFormat } from "../../../Helpers/TodayDate";
import useToken from "../../../CustomHooks/useToken";
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings";
import useSingleCompany from "../../../Helpers/SetDefaultCompany";
import { backColor } from "../../../Components/Common/ChartBackColor";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const [pieChartLabel, setpieChartLabel] = useState([]);
  const [pieChartData, setpieChartData] = useState([]);
  const [barChartLabel, setbarChartLabel] = useState([]);
  const [barChartData, setbarChartData] = useState([]);
  const CDate = moment().format(dateFormat);
  const { token } = useToken();
  const appDefSet = AppDefaultSettings.showSingleCompany;
  const defaultCompany = useSingleCompany(0, appDefSet);

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        position: "bottom",
        text: "Route Wise Assigned Vehicle",
      },
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        position: "bottom",
        text: "Counter Wise Total Collection",
      },
    },
    interaction: {
      intersect: false,
    },
  };

  const data = {
    labels: pieChartLabel,
    datasets: [
      {
        labels: "Route Wise Assigned Vehicle",
        data: pieChartData,
        backgroundColor: backColor,
        hoverOffset: 4,
        borderWidth: 3,
        borderColor: "#f0ecec",
      },
    ],
  };

  const barData = {
    labels: barChartLabel,
    datasets: [
      {
        label: "Total Collection",
        data: barChartData,
        backgroundColor: backColor,
      },
    ],
  };

  const routeCount = (sendData) => {
    getRouteWiseAssignedVehicleCountDetailsApi(sendData, (res) => {
      if (
        res?.RoutewiseAssignedVehicle !== undefined &&
        res?.RoutewiseAssignedVehicle.length > 0
      ) {
        let names = res.RoutewiseAssignedVehicle.map((e) => e.Route);
        setpieChartLabel(names);
        let mar = res.RoutewiseAssignedVehicle.map((e) => e.VehicleCount);
        setpieChartData(mar);
      } else {
        setpieChartLabel([]);
        setpieChartData([]);
      }
    });
  };

  const counterTotalCount = (sendData) => {
    const newSendData = {
      ...sendData,
      fromdate: sendData.routeDate,
      todate: sendData.routeDate,
    };
    getCounterwiseTotalCollectionAmtDetailsApi(newSendData, (res) => {
      if (res.length > 0) {
        setbarChartLabel(
          res.map((row) => {
            return row.Counter;
          })
        );

        setbarChartData(
          res.map((row) => {
            return row.TotalAmt;
          })
        );
      } else {
        setbarChartLabel([]);
        setbarChartData([]);
      }
    });
  };

  useEffect(() => {
    //on first load
    if (defaultCompany?.CId !== undefined) {
      let data = {
        routeDate: CDate,
        companyId: defaultCompany.CId,
      };
      routeCount(data);
      counterTotalCount(data);
    }
  }, [CDate, defaultCompany?.CId]);

  const onSelectDate = (e) => {
    //on date change
    let data = {
      routeDate: e.format(dateFormat),
      companyId: defaultCompany.CId,
    };
    routeCount(data);
    counterTotalCount(data);
  };

  return (
    <div className="contentContainer">
      <MainContainer>
        <Row>
          <Col sm={24} md={12} lg={16}>
            <Row>
              <Col xs={24} md={12}>
                <Card span={24}>
                  <Doughnut options={pieOptions} data={data} />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card span={24}>
                  <Pie options={pieOptions} data={data} />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card span={24}>
                  <Bar options={options} data={barData} />
                </Card>
              </Col>
            </Row>
          </Col>

          <Col sm={24} md={12} lg={8}>
            <GreetingCard>
              <div className="GlassContainer">
                <h1>Welcome Back</h1>
                <h3>{token?.UserName}</h3>
                <span>{moment().format("ll")}</span>
              </div>
            </GreetingCard>
            <Card>
              <Calendar fullscreen={false} onSelect={onSelectDate} />
            </Card>
          </Col>
        </Row>
      </MainContainer>
    </div>
  );
};

export default Dashboard;

const MainContainer = styled.div`
  background-color: #f9f9f9;
  float: right;
`;

const GreetingCard = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-top: 16px;
  background-image: url(${day});
  background-position: top;
  background-size: cover;
  overflow: hidden;
  box-shadow: 0 4px 4px 0 rgba(31, 38, 135, 0.37);
  margin-bottom: 16px;

  .GlassContainer {
    width: 100%;
    height: 100%;
    padding: 8px 16px;
    background: #cfa7a47e;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);

    h1 {
      font-size: 32px;
      color: #fefefe;
      margin-bottom: 8px;
    }
    h3 {
      font-size: 18px;
      font-weight: 500;
      color: #252e3d;
    }
    span {
      font-size: 24px;
      font-weight: 500;
    }
  }
`;
