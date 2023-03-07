import { useEffect, useState } from "react"
import {
    Card,
    Table,
    Tag,
    Button
} from 'antd';
import { useNavigate } from "react-router-dom";
import { getRoleDetailsApi } from "../../../Services/MiscService";

const Role = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Role Type',
            dataIndex: 'RoleType',
            key: 'RoleType',
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
            dataIndex: 'RId',
            key: 'RId',
            render: (text) => {
                return (
                    <Button
                        className="buttonRadius"
                        type="primary"
                        onClick={() => navigate({
                            pathname: `/admin/editroletype`,
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
        getRoleDetailsApi((res) => {
            setDataSource(res)
        })
    }

    return (
        <div className="contentContainer">
            <Card title={`Role Type Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/addroletype')
                    }}>
                    Add New Role
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

export default Role