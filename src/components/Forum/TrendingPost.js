import React from 'react';
import { FaCaretUp, FaCommentDots } from 'react-icons/fa';
import Avatar from '../UI/Avatar';
const TrendingPost = () => {
  return (
    <div className='flex w-full py-3 border-t border-gray-200 hover:shadow-lg transform duration-300 hover:-translate-y-1 cursor-pointer'>
      <div className='w-16 flex flex-col items-center'>
        <FaCaretUp />
        <span className='text-sm font-bold'>193</span>
      </div>
      <div className='w-full pl-2 flex flex-col'>
        <div className='flex items-center'>
          <Avatar className='h-8 w-8' isRound size={8} />
          <div className='flex flex-col ml-3'>
            <h2 className='text-xl text-black'>
              Google - Intern Software Engineer
            </h2>
            <span className='text-gray-800 text-xs'>
              posted by shiro 2 days ago.
            </span>
          </div>
        </div>

        <div className='py-2 text-sm text-gray-800'>
          Google | Engineer L4 | Mountain View | Jul 2020 [Offer] Experience: 6
          years of experience in startups.
        </div>

        <div className='mt-2 text-gray-800'>
          <FaCommentDots className='inline-block' />{' '}
          <span className='text-sm'>76 comments</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingPost;
