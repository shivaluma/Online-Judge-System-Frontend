import React, { useState, useRef } from 'react';
import Header from '../../components/UI/Header';

import { UnControlled as CodeMirror } from 'react-codemirror2';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  FaPlayCircle,
  FaExpandAlt,
  FaCompressAlt,
  FaRegCaretSquareUp,
} from 'react-icons/fa';
import { Select } from 'antd';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/idea.css');

require('codemirror/addon/display/autorefresh');
require('codemirror/mode/go/go');
require('codemirror/addon/edit/matchbrackets');

require('codemirror/mode/clike/clike');
require('codemirror/keymap/sublime');

require('codemirror/addon/edit/closebrackets');
const { Option } = Select;
export default () => {
  const [code, setCode] = useState('');
  const [running, setIsRunning] = useState(false);
  const [resultArr, setResultArr] = useState([]);
  const [isHeaderCollapse, setHederCollapse] = useState(false);
  const [showStdin, setShowStdin] = useState(false);
  const [language, changeLanguage] = useState('cpp');
  const [stdin, setStdin] = useState('');
  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  const stdinRef = useRef(null);
  let getResultInterval = null;
  const sendCode = async () => {
    if (running) return;
    setIsRunning(true);

    const response = await axios.post('http://35.220.245.247/submit', {
      src: utf8_to_b64(code),
      stdin: stdin,
      expected_result: '',
      lang: language,
      timeout: 2,
      isBase64: true,
    });
    const getResult = async () => {
      const result = await axios.get(response.data);
      if (
        result.data.status !== 'Queued' &&
        result.data.status !== 'Processing'
      ) {
        clearInterval(getResultInterval);

        result.data.time = dayjs().format('h:mm:ss A');
        if (!result.data.isError) result.data.status = 'Success';
        setResultArr([result.data, ...resultArr]);
        setIsRunning(false);
      }
    };
    getResultInterval = setInterval(getResult, 500);
  };

  const headerCollapseHandler = () => {
    setHederCollapse(!isHeaderCollapse);
  };

  const resultList = resultArr.map((result, index) => {
    if (result.status === 'Memory Exceeded') {
      return null;
    }
    if (result.status === 'Time Limit Exceeded') {
      return null;
    }
    if (result.stderr !== '') {
      return (
        <div key={index} className='flex flex-col px-2 mb-3'>
          <span className='text-xs text-blue-500'>{result.time}</span>
          <div className='text-sm text-red-600'>{result.stderr}</div>
        </div>
      );
    }
    return (
      <div key={index} className='flex flex-col px-2 mb-3'>
        <span className='text-xs text-blue-500'>{result.time}</span>
        <div className='text-sm text-green-600 whitespace-pre'>
          {`${result.output}`} ‣
          <span className='text-gray-700'>
            {Number.parseFloat(result.time_used[0]).toFixed(2)}ms
          </span>
        </div>
      </div>
    );
  });

  return (
    <div className='max-h-screen'>
      {!isHeaderCollapse && <Header noContainer />}
      <div className='flex'>
        <div className='flex flex-col w-2/3'>
          <div className='w-full px-5 border-b border-gray-300'>
            <div className='flex items-center py-2'>
              <span className='mr-4'>Language </span>
              <Select
                defaultValue='cpp'
                style={{ width: 120 }}
                onChange={(value) => changeLanguage(value)}
                className='rounded-lg'
              >
                <Option value='cpp'>C++</Option>
                <Option value='c'>C</Option>
                <Option value='java' disabled>
                  Java
                </Option>
                <Option value='Python' disabled>
                  Python
                </Option>
              </Select>
            </div>
          </div>
          <CodeMirror
            options={{
              theme: 'idea',
              lineNumbers: true,
              autoRefresh: true,
              mode: 'text/x-c++src',
              matchBrackets: true,
              smartIndent: true,
              autoCloseBrackets: true,
            }}
            onChange={(editor, data, value) => {
              setCode(value);
            }}
            className={`${
              isHeaderCollapse ? 'CodeMirror-expand' : 'CodeMirror-compress'
            }`}
          />
          <div
            className='flex items-center w-full p-1 border-t border-gray-400'
            style={{ height: '50px' }}
          >
            <div
              className='flex items-center px-4 py-2 text-sm text-white bg-green-500 rounded-full outline-none cursor-pointer focus:outline-none'
              onClick={sendCode}
              tabIndex={-1}
            >
              <FaPlayCircle /> <span className='ml-2'>Run Code</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-1/3 bg-gray-200 border-l border-gray-400'>
          <div className='flex items-center justify-between h-16 px-3 bg-gray-300 shadow-md'>
            <div className='font-semibold text-gray-800'>
              Output:{' '}
              {running ? (
                <span className='px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full'>
                  Running
                </span>
              ) : resultArr.length > 0 ? (
                resultArr[0].isError ? (
                  <span className='px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-full'>
                    {resultArr[0].status}
                  </span>
                ) : (
                  <span className='px-2 py-1 text-sm font-semibold text-white bg-green-500 rounded-full'>
                    {resultArr[0].status}
                  </span>
                )
              ) : (
                ''
              )}
            </div>
            <button
              className='p-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none'
              onClick={headerCollapseHandler}
            >
              {!isHeaderCollapse ? <FaExpandAlt /> : <FaCompressAlt />}
            </button>
          </div>

          <div
            className='relative flex flex-col flex-grow py-3 overflow-y-auto bg-gray-100'
            style={{
              maxHeight: `calc(100vh ${!isHeaderCollapse ? '- 64px' : ''} ${
                showStdin ? '- 192px' : ''
              } - 48px)`,
            }}
          >
            {resultList}
            <div
              className='absolute flex items-center self-end px-1 bg-white border border-gray-400 rounded-t-sm focus:outline-none'
              style={{ fontSize: '11px', bottom: '0', left: '0' }}
              tabIndex={-1}
              onClick={() => setShowStdin(!showStdin)}
            >
              stdin <FaRegCaretSquareUp className='ml-1' />
            </div>
          </div>

          {showStdin && (
            <textarea
              ref={stdinRef}
              className='w-full h-48 outline-none'
              onChange={(event) => setStdin(event.target.value)}
              value={stdin}
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
};
