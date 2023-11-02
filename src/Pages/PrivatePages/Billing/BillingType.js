import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Table,
    Tag,
} from 'antd';
import { useNavigate } from "react-router-dom";

const BillingType = () => {
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Billing Type',
            dataIndex: 'BillingType',
            key: 'BillingType',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
        },
        {
            title: 'Status',
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
                            pathname: `/admin/addbillingtype`,
                            search: `?q=${text}`
                        })}
                    >
                        Edit
                    </Button>

                )
            }
        }
    ]

    const dataSource = [
        {
          BillingType: 'Type A',
          Amount: 100,
          IsActive: true,
          VId: 1,
        },
        {
          BillingType: 'Type B',
          Amount: 150,
          IsActive: false,
          VId: 2,
        },
        // Add more data objects as needed
      ];

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