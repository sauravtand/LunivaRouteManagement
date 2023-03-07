import { useEffect, useState } from "react"
import {
    Card,
    Table,
    Tag,
    Button
} from 'antd';
import { useNavigate } from "react-router-dom";
import useSingleCompany from "../../../Helpers/SetDefaultCompany";
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings";

const Company = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()
    const appDefSet = AppDefaultSettings.showSingleCompany
    const defaultCompany = useSingleCompany(0, appDefSet)

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'CompanyName',
            key: 'CompanyName',
        },
        {
            title: 'Company Address',
            dataIndex: 'CompanyAddress',
            key: 'CompanyAddress',
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
                            pathname: `/admin/editcompany`,
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
        let defList = []
        if (defaultCompany.length === undefined) {
            defList.push(defaultCompany)
        } else {
            defList = defaultCompany
        }
        getTableData(defList)
    }, [defaultCompany])

    const getTableData = (newRes) => {
        setDataSource(newRes)
    }

    return (
        <div className="contentContainer">
            <Card title={`Company Details`} bordered={false}>
                {
                    appDefSet &&
                    <Button
                        className="floatRight"
                        type="primary"
                        ghost
                        onClick={() => {
                            navigate('/admin/addcompany')
                        }}>
                        Add New Company
                    </Button>
                }
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

export default Company