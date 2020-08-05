import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { TiPin } from 'react-icons/ti';
import { FaCaretUp, FaRegEye, FaCaretDown } from 'react-icons/fa';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const PostTile = ({ post }) => {
  const voteValue = post.upVote - post.downVote;

  return (
    <div className='flex px-5 py-4 items-center border-b border-gray-200'>
      <Avatar size={48} src={post?.authorAvatar} />
      <div className='flex flex-col ml-3 mb-1'>
        <div className='text-lg flex items-center'>
          <Tooltip placement='top' title={'Pinned'}>
            <TiPin className='text-2xl mr-2' />
          </Tooltip>

          <h3 className='text-base' style={{ color: '#212121' }}>
            {post.title}
          </h3>
        </div>

        <span className='text-xs text-gray-500 mt-1'>
          {post.authorUsername} created at: {dayjs(post.createdAt).fromNow()} |
          Last Update: {dayjs(post.updatedAt).fromNow()}
        </span>
      </div>
      <div className='ml-auto flex'>
        <div className='flex items-center font-thin mr-12'>
          {voteValue >= 0 ? (
            <FaCaretUp className='text-xl text-gray-400' />
          ) : (
            <FaCaretDown className='text-xl text-gray-400' />
          )}
          <span className='text-sm ml-1 text-gray-700'>
            {voteValue >= 0 ? voteValue : -voteValue}
          </span>
        </div>
        <div className='flex items-center text-gray-600 font-thin'>
          <FaRegEye className='text-xl text-gray-400' />
          <span className='text-sm ml-1 text-gray-700'>{post.View.view}</span>
        </div>
      </div>
    </div>
  );
};

export default PostTile;
