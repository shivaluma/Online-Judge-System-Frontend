import React from 'react';

const TagWithCount = ({ text, count }) => {
  return (
    <div className='bg-gray-200 border-gray-400 text-gray-800 py-1 rounded-md text-sm mr-2 mt-3'>
      <span className='h-full border-r border-gray-400 px-2'>{text}</span>
      <span className='h-full px-2 text-xs font-light'>{count}</span>
    </div>
  );
};

export default TagWithCount;
