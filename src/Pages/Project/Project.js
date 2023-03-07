import { Table } from 'antd'
import React from 'react'
import { EditButton, EnterBtn } from '../../Components/UI/ActionButton';
import Header from '../../Components/UI/Header'
import StatusBadge from '../../Components/UI/StatusBadge';

const Project = () => {
  const columns = [
    {
      title: 'कार्यक्रमको शिर्षक',
      dataIndex: 'projectTitle',
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },
      //   {
      //     text: 'Submenu',
      //     value: 'Submenu',
      //     children: [
      //       {
      //         text: 'Green',
      //         value: 'Green',
      //       },
      //       {
      //         text: 'Black',
      //         value: 'Black',
      //       },
      //     ],
      //   },
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ['descend'],
    },
    {
      title: 'अनुमानित बजेट',
      dataIndex: 'estimatedBudget',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.estimatedBudget - b.estimatedBudget,
    },

    {
      title: 'अनुमानित बजेट',
      dataIndex: 'estimatedBudget',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.estimatedBudget - b.estimatedBudget,
    },
    {
      title: 'वार्ड',
      dataIndex: 'ward',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.ward - b.ward,
    },
    {
      title: 'योजनाको अवस्था',
      dataIndex: 'stageOfPlanning',
      filters: [
        {
          text: 'Pending',
          value: 'pending',
        },
        {
          text: 'Completed',
          value: 'completed',
        },
        {
          text: 'On Progress',
          value: 'onProgress',
        }, {
          text: 'Cancled',
          value: 'cancled',
        },
      ],
      onFilter: (value, record) => record.stageOfPlanning.indexOf(value) === 0,
      render: (stageOfPlanning) => (
        <StatusBadge data={stageOfPlanning} />
      )
    },
    {
      title: 'कार्य',
      dataIndex: 'action',
      render: () => (
        <div style={{
          display: 'flex'
        }}>
          <EnterBtn />
          <EditButton />
        </div>
      )
    },
  ];
  const data = [
    {
      key: '1',
      projectTitle: 'title one title one title one title one title one title one title one title one title one title one title one title one ',
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
    <div>
      <Header title={"सिस्टममा सुचिकृत भएको र चालु अवस्थाका योजनाहरु :"} isProject></Header>
      <div className="contentContainer">
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </div>
  )
}

export default Project