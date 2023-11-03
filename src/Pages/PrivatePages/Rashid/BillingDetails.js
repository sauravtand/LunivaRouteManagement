import { Button, Card, Col, Input, Row, Table } from 'antd'
import React, { useState } from 'react'
import Filter from '../../../Components/Common/Filter'
import { ExcelExportBtn } from '../../../Components/Common/ExcelExportBtn'
import useSingleCompany from "../../../Helpers/SetDefaultCompany";
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings";
import { dateFormat } from "../../../Helpers/TodayDate";
import { getBillingDetailsByDateRange } from '../../../Services/ReportService';


const BillingDetails = () => {
  const [dataHead, setDataHead] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [filterData, setFilterData] = useState([])
  const appDefSet = AppDefaultSettings.showSingleCompany
  const [searchQuery, setSearchQuery] = useState('');
  const defaultCompany = useSingleCompany(0, appDefSet)
  const Title = "Billing Details"


  const makeTableData = (res) => {
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
   

      setDataHead(data)
      setDataSource(res)
      setFilterData(res)
    } else {
      setDataHead([])
      setDataSource([])
    }
    
    
  }

  const returnFilterData = (res) => {

    let data = {
      fromdate: res.FromTo[0].format(dateFormat),
      todate: res.FromTo[1].format(dateFormat),
      CounterId: res.CounterId,
      BillID: res.BillID,
    }
 
    getBillingDetailsByDateRange(data, (newRes) => {
     
      makeTableData(newRes)
    })
  }

  const filterTableData = () => {
   
    if (searchQuery.trim() === '') {
      // If the search query is empty, use the original data
      setDataSource(dataSource);
    } else if(searchQuery!==''){
      const searchValue = searchQuery;
      const filteredData = filterData.filter(item =>
        item.BId == searchValue
              );
      console.log(filterData,"filter")
      setDataSource(filteredData);
    }else{
      setDataSource(dataSource);
    }
  };
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


        <Row gutter={16} align="middle">
          <Col span={4}>
            <Input
              placeholder="Search by Bid"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={filterTableData}>
              Search
            </Button>
          </Col>
        </Row>


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

export default BillingDetails