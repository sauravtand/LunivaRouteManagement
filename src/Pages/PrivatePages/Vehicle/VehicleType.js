import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Table,
    Tag,
} from 'antd';
import { useNavigate } from "react-router-dom";
import { getVehicleTypeDetailsApi } from "../../../Services/MiscService";

const VehicleType = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Vehicle Type',
            dataIndex: 'VechicleType',
            key: 'VechicleType',
        },
        {
            title: 'Active',
            dataIndex: 'IsActive',
            key: 'IsActive',
            render: (text) => (
                text === true ?
                    <Tag color="#87d068">Active</Tag>
                    :
                    <Tag color="#f50">Inactive</Tag>
            )
        },
        {
            title: 'Action',
            dataIndex: 'VId',
            key: 'VId',
            render: (text) => {
                return (
                    <Button
                        className="buttonRadius"
                        type="primary"
                        onClick={() => navigate({
                            pathname: `/admin/editvehicletype`,
                            search: `?q=${text}`
                        })}
                    >
                        Edit
                    </Button>

                )
            }
        }
    ]


    useEffect(() => {
        getTableData()
    }, [])

    const getTableData = () => {
        getVehicleTypeDetailsApi((res) => {
            setDataSource(res)
        })
    }

    return (
        <div className="contentContainer">
            <Card title={`Vehicle Type Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/addvehicletype')
                    }}>
                    Add Vehicle Type
                </Button>
            </Card>
            <div className="tableReponsive">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
            </div>
        </div>
    )
}

export default VehicleType