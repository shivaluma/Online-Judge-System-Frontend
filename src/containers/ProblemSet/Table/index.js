import React from 'react';

import { Table } from 'antd';
import { Link } from 'react-router-dom';

const ProblemTable = ({ problems, loading }) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: 50,
    },
    {
      title: 'Title',
      dataIndex: ['title'],

      // specify the condition of filtering result
      // here is that finding the name started with `value`

      render: (title, problem) => (
        <Link
          to={{
            pathname: `/problem/${problem.id}`,
            state: {
              problem: problem,
            },
          }}
        >
          {title}
        </Link>
      ),
    },
    {
      title: 'Solution',
      dataIndex: 'hasSolution',
      width: 120,
    },
    {
      title: 'Acceptance',
      dataIndex: 'rate',
      sorter: (a, b) => a - b,
      render: (text) => text + '%',
      sortDirections: ['descend', 'ascend'],
      width: 120,
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      width: 120,
      render: (text) => (
        <span
          className={`${
            text === 'easy'
              ? 'bg-green-600'
              : test === 'medium'
              ? 'bg-orange-500'
              : 'bg-red-600'
          } px-2 text-white rounded-lg m-1 px-2 pb-1 font-semibold`}
          style={{ fontSize: '11px' }}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.length - b.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  return (
    <Table
      columns={columns}
      loading={loading}
      size='small'
      dataSource={problems.map((el, index) => {
        el.key = index;
        el.rate = el.AcceptCount === 0 ? 0 : el.AcceptCount / el.TotalCount;
        return el;
      })}
    />
  );
};

export default ProblemTable;
