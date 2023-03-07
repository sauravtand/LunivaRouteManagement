import { Card, Table } from 'antd'
import React from 'react'
import { useState } from 'react'
import { ExcelExportBtn } from '../../../Components/Common/ExcelExportBtn'
import Filter from '../../../Components/Common/Filter'
import { dateFormat } from '../../../Helpers/TodayDate'
import { GetReservationDetailsByDateApi } from '../../../Services/ReportService'

function ReservationDetails() {

    const [dataHead, setDataHead] = useState([])
    const [dataSource, setDataSource] = useState([])
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


        }
        console.log(data);
        GetReservationDetailsByDateApi(data, (newRes) => {
            makeTableData(newRes)
            console.log(newRes, 'Reservation Data');
        })
    }

    // Title for page and print variable

    const Title = 'Reservation Details Report';

    return (

        <div className="contentContainer">
            <Card title={Title} bordered={false}>
                <Filter

                    showFromToDate={true}
                    // showCompanyList={appDefSet}
                    returnFilterData={returnFilterData}
                />

            </Card>
            <ExcelExportBtn
                filterData={filterData}
                Title={Title}
                dataHead={dataHead}
                dataSource={dataSource}
                filename={'ReservationDetails.csv'}
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

export default ReservationDetails