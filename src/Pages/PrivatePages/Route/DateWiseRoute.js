import { useState } from "react"
import {
    Button,
    Card,
    Table,
    Tag,
} from 'antd';
import { getRouteDetailsDateWiseApi } from "../../../Services/RouteService";
import Filter from "../../../Components/Common/Filter";
import { dateFormat } from "../../../Helpers/TodayDate";
import CancelModal from "../../../Components/Common/CancelModal";

const DateWiseRouteDetails = () => {
    const [dataSource, setDataSource] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [sendCancelData, setSendCancelData] = useState([])
    const [currentSelectedDate, setCurrentSelectedDate] = useState('')

    const columns = [
        {
            title: 'Vehicle Number',
            dataIndex: 'VehicleNumber',
            key: 'VehicleNumber',
        },
        {
            title: 'Route Date',
            dataIndex: 'RouteDate',
            key: 'RouteDate',
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
            title: 'Remarks',
            dataIndex: 'Remarks',
            key: 'Remarks',
        },
        {
            title: 'Action',
            dataIndex: 'DId',
            key: 'DId',
            render: (text, record) => {
                console.log(record)
                return (
                    record?.IsActive === true &&
                    <Button
                        className="buttonRadius"
                        type="danger"
                        onClick={() => {
                            setSendCancelData({
                                DId: text,
                                VehicleId: record.VehicleId,
                                VehicleNumber: record.VehicleNumber
                            })
                            setShowModal(true)
                        }}
                    >
                        Cancel
                    </Button>
                )
            }
        },
    ]

    const getTableData = (selectedDate) => {
        let data = {
            routeday: selectedDate.SingleDate
        }
        getRouteDetailsDateWiseApi(data, (res) => {
            console.log(res);
            setDataSource(res)
        })
    }

    const returnFilterData = (res) => {
        const routeDate = {
            ...res,
            SingleDate: res.SingleDate.format(dateFormat)
        }
        setCurrentSelectedDate(routeDate)
        getTableData(routeDate)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const shouldTableRefresh = (res) => {
        if (res === true)
            getTableData(currentSelectedDate)
    }

    return (
        <div className="contentContainer">
            <Card title={`Cancel Route`} bordered={false}>
                {/* <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/addroutedetails')
                    }}>
                    Add New Route
                </Button> */}
                <Filter
                    returnFilterData={returnFilterData}
                    showSingleDatePicker={true}
                />
            </Card>
            <div className="tableReponsive">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
            </div>
            <CancelModal
                showModal={showModal}
                hideModal={hideModal}
                sendCancelData={sendCancelData}
                shouldTableRefresh={shouldTableRefresh}
            />
        </div>
    )
}

export default DateWiseRouteDetails