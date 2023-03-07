import { useState } from "react"
import {
    Card,
    Table,
} from 'antd';
import Filter from "../../../Components/Common/Filter";
import { getDatewiseCollectionByCounterDetailsApi } from "../../../Services/ReportService";
import { dateFormat } from "../../../Helpers/TodayDate";
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings";
import useSingleCompany from "../../../Helpers/SetDefaultCompany";
import { ExcelExportBtn } from "../../../Components/Common/ExcelExportBtn";

const CollectionByCounterReport = () => {
    const [dataHead, setDataHead] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [filterData, setFilterData] = useState([])

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
            counterid: res.CounterId,
            comapnyid: res.CompanyId !== undefined ? res.CompanyId : defaultCompany.CId
        }
        getDatewiseCollectionByCounterDetailsApi(data, (newRes) => {
            makeTableData(newRes)
        })
    }
    // title
    const Title = 'Collection By Counter Report'
    return (
        <div className="contentContainer">
            <Card title={Title} bordered={false}>
                <Filter
                    showFromToDate={true}
                    showCompanyList={appDefSet}
                    showCounter={true}
                    returnFilterData={returnFilterData}
                />
            </Card>
            <ExcelExportBtn
                filterData={filterData}
                Title={Title}
                dataHead={dataHead}
                dataSource={dataSource}
                filename={'collection by counter report.csv'}
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

export default CollectionByCounterReport