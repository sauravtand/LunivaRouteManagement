import { useState } from "react"
import {
    Button,
    Card,
    Table,
    Tag
} from 'antd';
import { getVehicleRegistrationDetailsApi } from "../../../Services/VehicleService";
import { useNavigate } from "react-router-dom";
import Filter from "../../../Components/Common/Filter";

const RegisterVehicle = () => {
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: 'Vehicle No.',
            dataIndex: 'VehicleNumber',
            key: 'VehicleNumber',
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'VehicleType',
            key: 'VehicleType',
        },
        {
            title: 'Entry Date',
            dataIndex: 'EntryDate',
            key: 'EntryDate',
        },
        {
            title: 'Is Active',
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
                            pathname: `/admin/editvehicle`,
                            search: `?q=${text}`
                        })}
                    >
                        Edit
                    </Button>
                )
            }
        },
    ]

    // useEffect(() => {
    //     getTableData()
    // }, [])

    const getTableData = (res) => {
        let data = {
            vId: res.VehicleListId
        }
        getVehicleRegistrationDetailsApi(data, (res) => {
            setDataSource(res)
        })
    }

    const returnFilterData = (res) => {
        getTableData(res)
    }

    return (
        <div className="contentContainer">
            <Card title={`Vehicle Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/addallvehicle')
                    }}>
                    Add New Vehicle
                </Button>
                <br />
                <br />
                <Filter
                    returnFilterData={returnFilterData}
                    showVehicleList={true}
                    showAll={true}
                />
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

export default RegisterVehicle