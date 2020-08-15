import React from 'react';

const TagWithCount = ({ text, count, isSelected, onClick, onRemove }) => {
  return (
    <div
      className={`${
        isSelected ? 'bg-gray-1000 text-white' : 'bg-gray-200 text-gray-800'
      } border-gray-400 py-1 rounded-md text-sm mr-2 mt-3`}
      onClick={() => onClick(text)}
    >
      <span className='h-full border-r border-gray-400 px-2'>{text}</span>
      <span
        className='h-full px-2 text-xs font-light cursor-pointer'
        onClick={() => {
          isSelected && onRemove(text);
        }}
      >
        {!isSelected ? count : `×`}
      </span>
    </div>
  );
};

export default TagWithCount;
