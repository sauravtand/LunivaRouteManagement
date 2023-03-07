import { useState } from "react"
import {
    Button,
    Card,
    Table,
    // Timeline
} from 'antd';
import { getVehicleStaffDetailsApi } from "../../../Services/VehicleStaffService";
import { useNavigate } from "react-router-dom";
import Filter from "../../../Components/Common/Filter";

const VehicleStaff = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Staff Name',
            dataIndex: 'StaffName',
            key: 'StaffName',
        },
        {
            title: 'Contact No.',
            dataIndex: 'StaffContactNumber',
            key: 'StaffContactNumber',
        },
        {
            title: 'Staff Type',
            dataIndex: 'StaffType',
            key: 'StaffType',
        },

        {
            title: 'Remarks',
            dataIndex: 'Remarks',
            key: 'Remarks',
        },
        {
            title: 'Action',
            dataIndex: 'VsId',
            key: 'VsId',
            render: (text, record) => {
                return (
                    <Button
                        className="buttonRadius"
                        type="primary"
                        onClick={() => navigate({
                            pathname: `/admin/editvehiclestaff`,
                            search: `?q=${record.VehicleId}&s=${text}`
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
        getVehicleStaffDetailsApi(data, (res) => {
            setDataSource(res)
        })
    }

    const returnFilterData = (res) => {
        getTableData(res)
    }

    return (
        <div className="contentContainer">
            <Card title={`Vehicle Staff Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/registervehiclestaff')
                    }}>
                    Add New Staff
                </Button>
                <br />
                <br />
                <Filter
                    returnFilterData={returnFilterData}
                    showVehicleList={true}
                    showAll={false}
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

export default VehicleStaff