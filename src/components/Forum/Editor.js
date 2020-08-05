import React, { memo, useState } from 'react';
import { Button, Tag, Alert } from 'antd';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import '../../assets/fix-markdown.css';
import EditableTagGroup from '../UI/EditableTagGroup';

const mdParser = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  },
});
const Editor = ({
  mode,
  setMode,
  value,
  setValue,
  editorRef,
  loading,
  isError,
  onSubmit,
}) => {
  const handleTitleChange = (event) => {
    setValue({ ...value, title: event.target.value });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full h-${mode} border-t px-5 transform duration-300 bg-white`}
      style={{
        boxShadow:
          '0 -7px 8px -5px rgba(0, 0, 0, 0.1), 0 6px 7px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        className='border border-gray-200 px-8 py-2 rounded-t-md border-gray-200 bg-white absolute z-30 top-0 -translate-y-full transform outline-none'
        style={{
          right: '2%',
        }}
        tabIndex={-1}
        onClick={() => {
          if (mode === '10/12') {
            setMode('1/2');
            return;
          }
          setMode('10/12');
        }}
      >
        <svg
          viewBox='0 0 24 24'
          width='1em'
          height='1em'
          className={`fill-current text-2xl transform ${
            mode === '10/12' ? 'rotate-180' : ''
          }`}
        >
          <path
            fillRule='evenodd'
            d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z'
          ></path>
        </svg>
      </div>
      <div className='w-full h-full overflow-hidden'>
        <div className='w-full flex py-3 justify-between items-center'>
          <div className='flex items-center'>
            <input
              className='rounded-md border border-gray-400 px-4 py-2 outline-none text-sm mr-4'
              placeholder='Enter topic title...'
              value={value.title}
              onChange={handleTitleChange}
              style={{ width: '500px' }}
            />

            {isError && (
              <Alert
                type='error'
                message='Title and content cannot be empty.'
                banner
              />
            )}
          </div>

          <div className='flex'>
            <Button
              size={'large'}
              className='mr-3'
              onClick={() => {
                setMode('0');
              }}
            >
              Close
            </Button>
            <Button
              type='primary'
              size={'large'}
              className='flex items-center'
              loading={loading}
              onClick={onSubmit}
            >
              Send
              <svg
                viewBox='0 0 24 24'
                width='1em'
                height='1em'
                className='fill-current ml-1'
              >
                <path
                  fillRule='evenodd'
                  d='M20.901 3.741l-9.582 17.697-4.015-5.734 7.684-7.822-9.881 4.798-3.619-4.706z'
                ></path>
              </svg>
            </Button>
          </div>
        </div>
        <div className='w-full h-full pt-3 markdown-body'>
          <MdEditor
            //value={value.content}

            ref={editorRef}
            style={{ height: 'calc(100% - 100px)', marginBottom: '5px' }}
            renderHTML={(text) => mdParser.render(text)}
            //onChange={handleEditorChange}
          />

          <EditableTagGroup value={value} setValue={setValue} />
        </div>
      </div>
    </div>
  );
};

export default memo(Editor);
