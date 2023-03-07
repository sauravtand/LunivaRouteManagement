import { useState } from "react"
import {
    Button,
    Card,
    Table,
} from 'antd';
import { getVehicleOwnerDetailsApi } from "../../../Services/VehicleOwnerService";
import { useNavigate } from "react-router-dom";
import Filter from "../../../Components/Common/Filter";

const VehicleOwner = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Owner Name',
            dataIndex: 'OwnerName',
            key: 'OwnerName',
        },
        {
            title: 'Owner Details',
            dataIndex: 'OwnerAddress',
            key: 'OwnerAddress',
            render: (text, record) => {
                return (
                    <>
                        <small>Address: {text}</small> <br />
                        <small>Contact: {record?.OwnerContactNumber} / {record?.OwnerMobileNumber}</small> <br />
                        <small>Email: {record?.OwnerEmailId}</small> <br />
                    </>
                )
            }
        },
        {
            title: 'Remarks',
            dataIndex: 'Remarks',
            key: 'Remarks',
        },
        {
            title: 'Action',
            dataIndex: 'OId',
            key: 'OId',
            render: (text, record) => {
                // console.log("text", text, record);
                return (
                    <Button
                        className="buttonRadius"
                        type="primary"
                        onClick={() => navigate({
                            pathname: `/admin/editvehicleowner`,
                            search: `?q=${record.VehicleId}&o=${text}`
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
        getVehicleOwnerDetailsApi(data, (res) => {
            setDataSource(res)
        })
    }

    const returnFilterData = (res) => {
        getTableData(res)
    }

    return (
        <div className="contentContainer">
            <Card title={`Vehicle Owner Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/registervehicleowner')
                    }}>
                    Add New Owner
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

export default VehicleOwner