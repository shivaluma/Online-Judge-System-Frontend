import React, { memo } from 'react';
import { Button, Alert } from 'antd';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import '../../assets/fix-markdown.css';
import EditableTagGroup from '../UI/Tag/EditableTagGroup';

const mdParser = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return '';
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
        className='absolute top-0 z-30 px-8 py-2 bg-white border border-gray-200 outline-none rounded-t-md -translate-y-full transform'
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
        <div className='flex items-center justify-between w-full py-3'>
          <div className='flex items-center'>
            <input
              className='px-4 py-2 mr-4 text-sm border border-gray-400 outline-none rounded-md'
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
                className='ml-1 fill-current'
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
            ref={editorRef}
            style={{ height: 'calc(100% - 100px)', marginBottom: '5px' }}
            renderHTML={(text) => mdParser.render(text)}
          />

          <EditableTagGroup value={value} setValue={setValue} />
        </div>
      </div>
    </div>
  );
};

export default memo(Editor);
