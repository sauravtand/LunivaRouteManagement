import { Card, Table } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ExcelExportBtn } from '../../../Components/Common/ExcelExportBtn'
import Filter from '../../../Components/Common/Filter'
import { AppDefaultSettings } from '../../../Config/AppDefaultSettings'
import useSingleCompany from '../../../Helpers/SetDefaultCompany'
import { dateFormat } from '../../../Helpers/TodayDate'
import { GetRouteAssignedTotalAmountByDateandUserIdApi } from '../../../Services/ReportService'

function TotalAmountByUser() {

    const [dataHead, setDataHead] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [filterData, setFilterData] = useState([])



    useEffect(() => {
        console.log(filterData, 'filter data');

    }, [filterData])

    const appDefSet = AppDefaultSettings.showSingleCompany

    const defaultCompany = useSingleCompany(0, appDefSet)

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
        } else {
            setDataHead([])
            setDataSource([])
        }
    }


    const returnFilterData = (res) => {

        setFilterData(res)
        let data = {
            fromdate: res.FromTo[0].format(dateFormat),
            todate: res.FromTo[1].format(dateFormat),
            companyId: res.CompanyId !== undefined ? res.CompanyId : defaultCompany.CId,
            userId: res.User

        }
        console.log(data);
        GetRouteAssignedTotalAmountByDateandUserIdApi(data, (newRes) => {
            makeTableData(newRes)
            console.log(newRes, 'NewRes');
        })
    }

    // Title for page and print variable

    const Title = 'Total Amount By User Report';

    return (

        <div className="contentContainer">
            <Card title={Title} bordered={false}>
                <Filter

                    showFromToDate={true}
                    showUsers={true}
                    // showCompanyList={appDefSet}
                    returnFilterData={returnFilterData}
                />

            </Card>
            <ExcelExportBtn
                filterData={filterData}
                Title={Title}
                dataHead={dataHead}
                dataSource={dataSource}
                filename={'collection report.csv'}
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

export default TotalAmountByUser