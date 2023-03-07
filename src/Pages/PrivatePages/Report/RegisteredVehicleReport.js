import { useState } from "react"
import {
    Card,
    Table,
} from 'antd';
import Filter from "../../../Components/Common/Filter";
import { getDatewiseRegisteredVehicleDetailsApi } from "../../../Services/ReportService";
import { dateFormat } from "../../../Helpers/TodayDate";
import useSingleCompany from "../../../Helpers/SetDefaultCompany";
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings";
import { ExcelExportBtn } from "../../../Components/Common/ExcelExportBtn";

const RegisteredVehicleReport = () => {
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
            companyId: res.CompanyId !== undefined ? res.CompanyId : defaultCompany.CId
        }
        getDatewiseRegisteredVehicleDetailsApi(data, (newRes) => {
            makeTableData(newRes)
        })
    }
    // Title
    const Title = 'Registered Vehicle Report'
    return (
        <div className="contentContainer">
            <Card title={Title} bordered={false}>
                <Filter
                    showFromToDate={true}
                    showCompanyList={appDefSet}
                    returnFilterData={returnFilterData}
                />
            </Card>
            <ExcelExportBtn
                dataHead={dataHead}
                filterData={filterData}
                Title={Title}
                dataSource={dataSource}
                filename={'registered vehicle report.csv'}
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

export default RegisteredVehicleReport