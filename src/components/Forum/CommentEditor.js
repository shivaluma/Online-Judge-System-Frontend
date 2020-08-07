import React, { useState } from 'react';
import { Mentions } from 'antd';
import { Option } from 'antd/lib/mentions';
import { useDebouncedCallback } from 'use-debounce';
import API from '../../api';
const CommentEditor = ({
  content,
  setContent,
  onSendHandler,
  disabled,
  toggleEditor,
}) => {
  const [options, setOptions] = useState([]);
  const loadUser = async (query) => {
    const response = await API.get('user/find?query=' + query);
    setOptions(response.data.list);
  };
  const [loadUserDebounce] = useDebouncedCallback(loadUser, 300);

  return (
    <div className='m-4 flex'>
      <Mentions
        className='outline-none rounded-l-md hover:outline-none'
        rows={2}
        style={{ resize: 'none' }}
        value={content}
        onSearch={loadUserDebounce}
        onChange={(value) => {
          setContent(value);
        }}
        placeholder='Enter comment here ...'
        autoSize={{ minRows: 2, maxRows: 6 }}
      >
        {options.map((option) => (
          <Option key={option.username} value={option.username}>
            {option.username}
          </Option>
        ))}
      </Mentions>

      <div className='w-16 rounded-r-md border-t border-r border-b border-gray-400 flex flex-col items-center overflow-hidden'>
        {disabled ? (
          <button
            className='text-xs py-1 border-b border-gray-400 w-full focus:outline-none disabled:text-gray-200'
            onClick={toggleEditor}
          >
            Cancel
          </button>
        ) : (
          <button className='text-xs py-1 border-b border-gray-400 w-full focus:outline-none disabled:text-gray-200'>
            View
          </button>
        )}

        <button
          className='text-xs py-1 flex-grow w-full text-white focus:outline-none'
          style={{
            background: 'linear-gradient(35deg, #546e7a, #37474f)',
          }}
          onClick={onSendHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentEditor;
