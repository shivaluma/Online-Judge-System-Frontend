import React from 'react';

import { FaUser, FaHeart, FaChartPie, FaFileCode } from 'react-icons/fa';

const UserBoard = ({ user, logout }) => {
  return (
    <>
      <div
        className='absolute bg-white rotate-45 transform'
        style={{
          height: '10px',
          width: '10px',
          right: '23px',
          bottom: '-16px',
        }}
      ></div>
      <div
        className='absolute z-30 pt-2 overflow-hidden bg-white border-none rounded-lg shadow-lg transition duration-300'
        style={{ minWidth: '240px', right: '1%', top: '30px' }}
      >
        <div className='flex justify-between w-full h-6 px-2 py-1 text-gray-800'>
          <div className='flex items-center text-sm'>
            <FaUser />
            <span className='ml-1 font-semibold'>{user.username}</span>
          </div>

          <div
            className='text-teal-700 border border-teal-700 rounded-md'
            style={{ fontSize: '9px', padding: '0px 5px' }}
          >
            Member
          </div>
        </div>

        <div className='flex mt-2 border-t border-b border-gray-200'>
          <div className='flex flex-col items-center justify-center w-1/3 h-20 border-r hover:bg-gray-200'>
            <FaHeart className='text-red-600' />
            <span
              style={{
                fontSize: '10px',
                color: '#95a5a6',
                marginTop: '5px',
              }}
            >
              My List
            </span>
          </div>
          <div className='flex flex-col items-center justify-center w-1/3 h-20 border-r hover:bg-gray-200'>
            <FaChartPie className='text-orange-600' />
            <span
              style={{
                fontSize: '10px',
                color: '#95a5a6',
                marginTop: '5px',
              }}
            >
              Progress
            </span>
          </div>
          <div className='flex flex-col items-center justify-center w-1/3 h-20 border-r hover:bg-gray-200'>
            <FaFileCode className='text-green-600' />
            <span
              style={{
                fontSize: '10px',
                color: '#95a5a6',
                marginTop: '5px',
              }}
            >
              Submissions
            </span>
          </div>
        </div>

        <div className='px-2 py-2 text-sm text-gray-700 hover:bg-gray-200'>
          Change Password
        </div>
        <div
          className='px-2 py-2 text-sm text-red-700 outline-none cursor-pointer hover:bg-gray-200'
          tabIndex={-1}
          onClick={logout}
        >
          Sign Out
        </div>
      </div>
    </>
  );
};

export default UserBoard;
