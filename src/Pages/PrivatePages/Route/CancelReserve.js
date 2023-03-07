import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Table,
    Tag,
} from 'antd';
import Filter from "../../../Components/Common/Filter";
import { dateFormat } from "../../../Helpers/TodayDate";
import CancelModal from "../../../Components/Common/CancelModal";
import { GetReservationDetailsByDateApi } from "../../../Services/ReportService";

const CancelReserve = () => {
    const [dataSource, setDataSource] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [sendCancelData, setSendCancelData] = useState([])
    const [reserveCancelData, setReserveCancelData] = useState([])
    const [currentSelectedDate, setCurrentSelectedDate] = useState('')


    // useEffect(() => {
    //     console.log(reserveCancelData, 'reserveCancelDAta from same page');
    // }, [reserveCancelData])


    const columns = [
        {
            title: 'Vehicle Number',
            dataIndex: 'VehicleNumber',
            key: 'VehicleNumber',
        },
        {
            title: 'Reservation Date-Time',
            dataIndex: 'ReservationDate',
            key: 'ReservationDate',
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
            dataIndex: 'ReserveRemarks',
            key: 'ReserveRemarks',
        },
        {
            title: 'Action',
            dataIndex: 'DId',
            key: 'DId',
            render: (text, record) => {
                return (
                    record?.IsActive === true &&
                    <Button
                        className="buttonRadius"
                        type="danger"
                        onClick={() => {
                            // console.log(text, 'text', record, 'record');
                            setReserveCancelData(record)
                            setSendCancelData({
                                DId: text,
                                VehicleId: record.VehicleId,
                                VehicleNumber: record.VehicleNumber
                            })
                            setShowModal(true)
                            // console.log(record, 'this is the record')
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
            fromdate: selectedDate.SingleDate,
            todate: selectedDate.SingleDate
        }
        GetReservationDetailsByDateApi(data, (res) => {
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
            <Card title={`Cancel Reservation`} bordered={false}>
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
                isReservation={true}
                showModal={showModal}
                hideModal={hideModal}
                reserveCancelData={reserveCancelData}
                sendCancelData={sendCancelData}
                shouldTableRefresh={shouldTableRefresh}

            />
        </div>
    )
}

export default CancelReserve