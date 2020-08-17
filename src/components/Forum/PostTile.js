import React from 'react';
import { Avatar, Tooltip, Tag } from 'antd';
import { TiPin } from 'react-icons/ti';
import { FaCaretUp, FaRegEye, FaCaretDown } from 'react-icons/fa';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const PostTile = ({ post }) => {
  const voteValue = post.upVote - post.downVote;

  return (
    post && (
      <div className='flex items-center px-5 py-4 border-b border-gray-200'>
        <Avatar size={48} src={post?.authorAvatar} />
        <div className='flex flex-col mb-1 ml-3'>
          <div className='flex items-center text-lg'>
            <Tooltip placement='top' title={'Pinned'}>
              <TiPin className='mr-2 text-2xl' />
            </Tooltip>

            <h3 className='text-base' style={{ color: '#212121' }}>
              {post.title}
            </h3>

            <div className='ml-3'>
              {post.Tags.map((tag, index) => (
                <Tag key={index}>{tag.content}</Tag>
              ))}
            </div>
          </div>

          <span className='mt-1 text-xs text-gray-500'>
            {post.authorUsername} created at: {dayjs(post.createdAt).fromNow()}{' '}
            | Last Update: {dayjs(post.updatedAt).fromNow()}
          </span>
        </div>
        <div className='flex ml-auto'>
          <div className='flex items-center mr-12 font-thin'>
            {voteValue >= 0 ? (
              <FaCaretUp className='text-xl text-gray-400' />
            ) : (
              <FaCaretDown className='text-xl text-gray-400' />
            )}
            <span className='ml-1 text-sm text-gray-700'>
              {voteValue >= 0 ? voteValue : -voteValue}
            </span>
          </div>
          <div className='flex items-center font-thin text-gray-600'>
            <FaRegEye className='text-xl text-gray-400' />
            <span className='ml-1 text-sm text-gray-700'>{post.View.view}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default PostTile;
