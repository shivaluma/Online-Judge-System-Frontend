import React from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Tooltip, Avatar } from 'antd';
import { TiPin } from 'react-icons/ti';
const Post = (props) => {
  console.log(props);
  return (
    <div className='container mt-6 '>
      <div className='bg-white rounded-sm shadow-md mb-12'>
        <div className='flex py-3 border-b border-gray-200'>
          <Link to='/discuss'>
            <div className='flex inline-flex items-center text-gray-700 py-1 px-4 border-r border-gray-200'>
              <svg
                viewBox='0 0 24 24'
                width='1em'
                height='1em'
                className='fill-current'
              >
                <path
                  fillRule='evenodd'
                  d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'
                ></path>
              </svg>
              <span className='ml-1'> Back</span>
            </div>
          </Link>
          <div className='text-lg flex items-center ml-3'>
            <Tooltip placement='top' title={'Pinned'}>
              <TiPin className='text-2xl mr-2' />
            </Tooltip>

            <h3 className='text-md'>Microsoft Online Assessment Questions</h3>
          </div>
        </div>
        <div className='flex'>
          <div
            className='h-64 flex flex-col items-center py-2'
            style={{ width: '82.77px' }}
          >
            <button className='rounded-md px-4 py-2 bg-gray-200 focus:outline-none'>
              <FaCaretUp className='text-gray-700' />
            </button>
            <span className='text-sm text-gray-600 py-2'>120</span>
            <button className='rounded-md px-4 py-2 bg-gray-200 focus:outline-none'>
              <FaCaretDown className='text-gray-700' />
            </button>
          </div>

          <div className='flex-grow'>
            <div className='my-2 flex text-gray-500 items-center text-xs'>
              <Avatar
                size={32}
                src='https://i.pinimg.com/originals/a0/c0/23/a0c023ba0b1e25ecdf01745b53cbf6fd.jpg'
              />
              <span className='ml-2'>Shiro</span>
              <span className='ml-4 flex items-center'>
                <svg
                  viewBox='0 0 24 24'
                  width='1em'
                  height='1em'
                  className='fill-current text-md mr-1'
                >
                  <path
                    fillRule='evenodd'
                    d='M13.133 14.065C15.941 14.363 20 15.68 20 18v2H4v-2c0-2.321 4.059-3.637 6.867-3.935L10.5 17l1.5 1 1.5-1-.367-2.935zM12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'
                  ></path>
                </svg>
                Super Admin
              </span>
              <span className='ml-4'>Last Edit: June 25, 2020 5:06 AM</span>
              <span className='ml-4'>143.9K Views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
