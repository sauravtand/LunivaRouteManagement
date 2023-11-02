import { useEffect, useState } from "react";
import { Card, Table } from "antd";
import Filter from "../../../Components/Common/Filter";
import { getDatewiseRegisteredVehicleDetailsApi } from "../../../Services/ReportService";
import { dateFormat } from "../../../Helpers/TodayDate";
import { ExcelExportBtn } from "../../../Components/Common/ExcelExportBtn";
import axios from "axios";

const TicketsLists = () => {
  const [dataHead, setDataHead] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const makeTableData = (res) => {
    if (res.length !== 0) {
      let tableKeys = Object.keys(res[0]);
      let data = [];
      tableKeys.forEach((ele) => {
        data.push({
          title: ele,
          dataIndex: ele,
          key: ele,
        });
      });
      if (data.length >= 2) {
        // Remove the second-to-last object using splice()
        const indexToRemove = data.length - 2;
        data.splice(indexToRemove, 1);
      }
      // const index = data.indexOf('')
      console.log(data, "121212");
      setDataSource(res);
      setDataHead(data);
    } else {
      setDataHead([]);
      setDataSource([]);
    }
  };

  const returnFilterData = (res) => {
    setFilterData(res);

    axios
      .get(
        "https://lunivacare.ddns.net/LunivaRouteAPIUAT/LunivarouteManagementApi/GetListOfTicketByDateRange",
        {
          params: {
            fromdate: res.FromTo[0].format(dateFormat),
            todate: res.FromTo[1].format(dateFormat),
          },
        }
      )
      .then((res) => {
        makeTableData(res.data.DatewiseTicketDetails);
      });

    // getDatewiseRegisteredVehicleDetailsApi(data, (newRes) => {
    //   makeTableData(newRes);
    // });
  };
  // Title
  const Title = "Tickets";
  return (
    <div className="contentContainer">
      <Card title={Title} bordered={false}>
        <Filter
          showFromToDate={true}
          //   showCompanyList={appDefSet}
          returnFilterData={returnFilterData}
        />
      </Card>
      <ExcelExportBtn
        dataHead={dataHead}
        filterData={filterData}
        Title={Title}
        dataSource={dataSource}
        filename={"registered vehicle report.csv"}
      />
      <div className="tableReponsive">
        <Table columns={dataHead} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default TicketsLists;
