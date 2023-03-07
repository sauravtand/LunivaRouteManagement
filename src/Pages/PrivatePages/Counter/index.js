import { useEffect, useState } from "react"
import {
    Card,
    Table,
    Tag,
    Button
} from 'antd';
import { getCounterDetailsApi } from "../../../Services/CounterService";
import { useNavigate } from "react-router-dom";

const Counter = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Counter Name',
            dataIndex: 'CounterName',
            key: 'CounterName',
        },
        {
            title: 'Counter Location',
            dataIndex: 'CounterLocation',
            key: 'CounterLocation',
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
            dataIndex: 'CId',
            key: 'CId',
            render: (text) => {
                return (
                    <Button
                        className="buttonRadius"
                        type="primary"
                        onClick={() => navigate({
                            pathname: `/admin/editcounter`,
                            search: `?q=${text}`
                        })}
                    >
                        Edit
                    </Button>
                )
            }
        },
    ]

    useEffect(() => {
        getTableData()
    }, [])

    const getTableData = () => {
        getCounterDetailsApi(res => {
            setDataSource(res)
        })
    }

    return (
        <div className="contentContainer">
            <Card title={`Counter Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/addcounter')
                    }}>
                    Add New Counter
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

export default Counter