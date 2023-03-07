import { useState } from "react"
import {
    Card,
    message,
    Table,
} from 'antd';
import Filter from "../../../Components/Common/Filter";
import { getDatewiseCollectionDetailsApi } from "../../../Services/ReportService";
import { dateFormat } from "../../../Helpers/TodayDate";
import { ExcelExportBtn } from "../../../Components/Common/ExcelExportBtn";
import { GetRouteAssignedDetailsByDateandUserId } from "../../../Services/RouteService";
import { useEffect } from "react";

const DynamicReport = () => {
    const [dataHead, setDataHead] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [reloadTable, setReloadTable] = useState(false)
    const [filterData, setFilterData] = useState([])


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
            companyId: 1,
            userId: res.User
        }
        GetRouteAssignedDetailsByDateandUserId(data, (newRes) => {

            if (newRes.UserWiseRoute) {
                console.log(newRes, 'newRes length');

                makeTableData(newRes.UserWiseRoute)
            }
            else {
                setDataHead([])
                setDataSource([])

                // makeTableData()
                // setReloadTable(true)
                console.log('hellohello');
            }






        })
    }
    //Title
    const Title = 'Collection Report'

    return (
        <div className="contentContainer">
            <Card title={Title} bordered={false}>
                <Filter
                    showUsers={true}
                    showFromToDate={true}
                    returnFilterData={returnFilterData}
                />
            </Card>
            <ExcelExportBtn
                Title={Title}
                filterData={filterData}
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

export default DynamicReport