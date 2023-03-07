import { useEffect, useState } from "react"
import {
    Card,
    Table,
    Tag,
    Button
} from 'antd';
import { useNavigate } from "react-router-dom";
import { getStaffTypeApi } from "../../../Services/MiscService";

const Staff = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Staff Type',
            dataIndex: 'StaffType',
            key: 'StaffType',
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
            dataIndex: 'StId',
            key: 'StId',
            render: (text) => {
                return (
                    <Button
                        className="buttonRadius"
                        type="primary"
                        onClick={() => navigate({
                            pathname: `/admin/editstafftype`,
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
        getStaffTypeApi((res) => {
            setDataSource(res)
        })
    }

    return (
        <div className="contentContainer">
            <Card title={`Staff Type Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/addstafftype')
                    }}>
                    Add New Staff
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

export default Staff