import {
    Button,
    Card,
    Table,
    Tag,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getBillingTypeDetailsApi } from '../../../Services/MiscService';

const BillingType = () => {
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Bill Type',
            dataIndex: 'BillType',
            key: 'BillType',
        },
        {
            title: 'Charge',
            dataIndex: 'Charge',
            key: 'Charge',
        },
        {
            title: 'IsActive',
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
            dataIndex: 'TId',
            key: 'TId',
            render: (text) => {
                return (
                    <Button
                        className="buttonRadius"
                        type="primary"
                        onClick={() => navigate({
                            pathname: `/admin/editbillingtype`,
                            search: `?q=${text}`  
                        })}
                    >
                        Edit
                    </Button>
                );
            }
        }
            
        
    ]

    useEffect(() => {
        getTableData()
    }, [])

    const getTableData = () => {
        getBillingTypeDetailsApi((res) => {
            console.log(res,"hello")
            setDataSource(res)
                 })
    }




  return (
   <>
   <div className="contentContainer">
            <Card title={`Billing Type Details`} bordered={false}>
                <Button
                    className="floatRight"
                    type="primary"
                    ghost
                    onClick={() => {
                        navigate('/admin/addbillingtype')
                    }}>
                    Add Billing Type
                </Button>
            </Card>
            <div className="tableReponsive">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
            </div>
        </div>
   </>
  )
}

export default BillingType