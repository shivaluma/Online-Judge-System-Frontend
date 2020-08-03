import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { TiPin } from 'react-icons/ti';
import { FaCaretUp, FaRegEye } from 'react-icons/fa';
const PostTile = () => {
  return (
    <div className='flex px-5 py-4 items-center border-b border-gray-200'>
      <Avatar
        size={48}
        src='https://i.pinimg.com/originals/a0/c0/23/a0c023ba0b1e25ecdf01745b53cbf6fd.jpg'
      />
      <div className='flex flex-col ml-3 mb-1'>
        <div className='text-lg flex items-center'>
          <Tooltip placement='top' title={'Pinned'}>
            <TiPin className='text-2xl mr-2' />
          </Tooltip>

          <h3 className='text-md'>Microsoft Online Assessment Questions</h3>
        </div>

        <span className='text-xs text-gray-500 mt-1'>
          Shiro created at: October 6, 2019 6:40 AM | Last Reply: creppocchovcl
          3 days ago
        </span>
      </div>

      <div className='flex items-center ml-auto font-thin'>
        <FaCaretUp className='text-xl text-gray-300' />
        <span className='text-sm ml-1 text-gray-500'>149</span>
      </div>
      <div className='flex items-center ml-auto text-gray-600 font-thin'>
        <FaRegEye className='text-xl text-gray-300' />
        <span className='text-sm ml-1 text-gray-500'>149</span>
      </div>
    </div>
  );
};

export default PostTile;
