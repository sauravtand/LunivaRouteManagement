import { Button, Card, Col, Input, Row, Table } from 'antd'
import React, { useState } from 'react'
import Filter from '../../../Components/Common/Filter'
import { ExcelExportBtn } from '../../../Components/Common/ExcelExportBtn'
import useSingleCompany from "../../../Helpers/SetDefaultCompany";
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings";
import { dateFormat } from "../../../Helpers/TodayDate";
import { getBillingSummary } from '../../../Services/ReportService';


const BillingSummary = () => {
  const [dataHead, setDataHead] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [filterData, setFilterData] = useState([])
  const appDefSet = AppDefaultSettings.showSingleCompany
  const [searchQuery, setSearchQuery] = useState('');
  const defaultCompany = useSingleCompany(0, appDefSet)
  const Title = "Billing Details"


  const makeTableData = (res) => {
    console.log(res, "its main res")
    if (res.length !== 0) {
      let tableKeys = Object.keys(res[0]);
      let data = []
      tableKeys.forEach(ele => {

        data.push({
          title: ele,
          dataIndex: ele,
          key: ele,
        })
      })
      console.log(data, 'its main data ')

      setDataHead(data)
      setDataSource(res)
    } else {
      setDataHead([])
      setDataSource([])
    }
    //  console.log(dataHead,"dataherad")
  }

  const returnFilterData = (res) => {

    setFilterData(res)
    let data = {
      fromdate: res.FromTo[0].format(dateFormat),
      todate: res.FromTo[1].format(dateFormat),
      CounterId: res.CounterId,
      BillID: res.BillID,
    }
    console.log(data, "its data")
    getBillingSummary(data, (newRes) => {
      console.log(newRes, "itsnew res")
      makeTableData(newRes)
    })
  }


  return (
    <div className="contentContainer">

    <Card title={Title} bordered={false}>
      <Filter
        showFromToDate={true}
        showBillType={true}
        showCounter={true}
        showCompanyList={appDefSet}
        returnFilterData={returnFilterData}

      />

    </Card>
    <ExcelExportBtn
      dataHead={dataHead}
      filterData={filterData}
      Title={Title}
      dataSource={dataSource}
      filename={'bill detailsreport.csv'}
    />
    <div className="tableReponsive">
      <Table
        columns={dataHead}
        dataSource={dataSource}
      />
    </div>

  </div>
  )
}

export default BillingSummary