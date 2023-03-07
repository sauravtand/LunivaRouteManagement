import { useEffect, useState } from "react"
import {
    Table,
} from 'antd';
import { getVehicleWiseDetailsRouteIdApi } from "../../../Services/RouteService";

const VehicleWiseRouteDetails = () => {
    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: 'Route Date',
            dataIndex: 'RouteDate',
            key: 'RouteDate',
        },

        {
            title: 'Remarks',
            dataIndex: 'Remarks',
            key: 'Remarks',
        },
    ]

    useEffect(() => {
        getTableData()
    }, [])

    const getTableData = () => {
        let data = {
            routeId: 1
        }
        getVehicleWiseDetailsRouteIdApi(data, (res) => {
            setDataSource(res)
        })
    }

    return (
        <div className="contentContainer">
            <div className="tableReponsive">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
            </div>
        </div>
    )
}

export default VehicleWiseRouteDetails