import React from 'react';

import { Table } from 'antd';
import { Link } from 'react-router-dom';

const ProblemTable = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'key',

      // specify the condition of filtering result
      // here is that finding the name started with `value`

      sorter: (a, b) => a.key - b.key,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Title',
      dataIndex: 'name',

      // specify the condition of filtering result
      // here is that finding the name started with `value`

      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      render: (text) => <Link>{text}</Link>,
    },
    {
      title: 'Solution',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Acceptance',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Difficulty',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Kids With the Greatest Number of Candies',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <Table
      columns={columns}
      size='small'
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default ProblemTable;
