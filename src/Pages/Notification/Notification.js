import { Table } from 'antd'
import React from 'react'

const Notification = () => {
  const columns = [
    {
      title: 'सि. न.',
      dataIndex: 'sn',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.sn - b.sn,
    },
    {
      title: 'कार्यक्रमको नाम',
      dataIndex: '	nameOfTheProgram',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.nameOfTheProgram - b.nameOfTheProgram,
    },

    {
      title: 'मिती',
      dataIndex: 'date',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.date - b.date,
    },
    {
      title: 'प्रकार',
      dataIndex: 'type',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.ward - b.ward,
    },
    {
      title: 'थप जानकारी',
      dataIndex: 'moreInfo',
    }
  ];
  const data = [
    {
      key: '1',
      projectTitle: 'title one',
      estimatedBudget: 4000,
      settlementAmount: 3000,
      stageOfPlanning: "pending",
      ward: 3,

    },
    {
      key: '2',
      projectTitle: 'title one',
      estimatedBudget: 5000,
      settlementAmount: 3000,
      stageOfPlanning: "pending",
      ward: 1,
    },
    {
      key: '3',
      projectTitle: 'title one',
      estimatedBudget: 6000,
      settlementAmount: 3000,
      stageOfPlanning: "cancled",
      ward: 5,
    },
    {
      key: '4',
      projectTitle: 'title one',
      estimatedBudget: 8000,
      settlementAmount: 3000,
      stageOfPlanning: "onProgress",
      ward: 2,
    },
    {
      key: '1',
      projectTitle: 'title one',
      estimatedBudget: 14000,
      settlementAmount: 3000,
      stageOfPlanning: "completed",
      ward: 12,
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <>
      <div className="contentContainer">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </>
  )
}

export default Notification