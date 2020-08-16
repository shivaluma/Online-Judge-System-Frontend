import React, { useState, useEffect } from 'react';
import HeaderWhite from '../../components/UI/Header/HeaderWhite';
import { Tabs, Select, Table, Skeleton } from 'antd';
import { MdDescription } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { FaCaretUp, FaPlayCircle } from 'react-icons/fa';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Redirect, Switch, Route } from 'react-router-dom';
import SampleCode from '../../utils/sampleCode';
import API from '../../api';
import dayjs from 'dayjs';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/idea.css');

require('codemirror/addon/display/autorefresh');
require('codemirror/mode/go/go');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/selection/active-line');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/foldcode');
require('codemirror/mode/clike/clike');
require('codemirror/keymap/sublime');
require('codemirror/addon/fold/foldgutter.css');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/edit/trailingspace');
const { TabPane } = Tabs;
const { Option } = Select;
const Problem = (props) => {
  const [language, changeLanguage] = useState('cpp');
  const [currentOption, setCurrentOption] = useState('description');
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState(SampleCode[language].code);
  const [loading, setLoading] = useState(false);
  const [consoleTab, setConsoleTab] = useState('testcase');
  const [submitResponse, setSubmitResponse] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const columns = [
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => dayjs(text).format('HH:mm DD/MM/YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Runtime',
      dataIndex: 'runtime',
      key: 'runtime',
      render: (text) => text + 'ms',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
  ];

  useEffect(() => {
    setCurrentOption(props?.match?.params?.option || 'description');
    setProblem(props?.location?.state?.problem || null);
  }, []);

  useEffect(() => {
    if (problem) {
      (async function () {
        const response = await API.get(`submission?problemId=${problem.id}`);
        setSubmissions(response.data.submissions);
      })();
    }
  }, [problem]);

  const submitCodeHandler = async () => {
    setCurrentOption('submission');
    setLoading(true);
    const response = await API.post('submission', {
      code: code,
      language: language,
      problemId: problem.id,
    });
    setLoading(false);
    console.log(response.data);
    setSubmitResponse(response.data.result);
    response.data.submission.key = response.data.submission.updatedAt;
    setSubmissions([response.data.submission, ...submissions]);
  };

  return (
    <div className='h-screen max-h-screen flex flex-col'>
      <HeaderWhite />

      <div className='flex flex-1 w-full'>
        <div className='w-full flex h-full'>
          <div className='w-1/2 flex flex-col justify-start items-stretch flex-stretch'>
            <Tabs
              activeKey={`${currentOption}`}
              type='card'
              size={'small'}
              onChange={(value) => setCurrentOption(value)}
              tabBarGutter={0}
            >
              <TabPane
                tab={
                  <div className='flex items-center w-32 justify-center text-sm'>
                    <MdDescription className='mr-2' /> Description{' '}
                  </div>
                }
                key='description'
              >
                <div className='flex flex-col flex-grow px-6'>
                  <h3
                    className=''
                    style={{
                      fontSize: '16px',
                      color: 'rgb(33, 33, 33)',
                      fontWeight: '600',
                    }}
                  >
                    {problem ? (
                      `${problem.id}. ${problem.title}`
                    ) : (
                      <Skeleton.Button
                        active
                        size='default'
                        shape={'square'}
                        style={{ width: 500 }}
                      />
                    )}
                  </h3>
                  <div className='flex items-center mt-3 pb-4 border-b border-gray-200'>
                    <span className='text-green-500 text-xs font-semibold'>
                      {problem && problem.difficulty}
                    </span>
                    <div className='flex items-center ml-6 text-xs'>
                      <AiOutlineLike className='text-sm' />{' '}
                      <span className='ml-2'>402</span>
                    </div>
                    <div className='flex items-center ml-6 text-xs'>
                      <AiOutlineLike className='text-sm' />{' '}
                      <span className='ml-2'>204</span>
                    </div>
                  </div>

                  <div className='w-full mt-4'>
                    <Skeleton active loading={problem === null}>
                      {problem && problem.description}
                    </Skeleton>
                  </div>
                </div>
              </TabPane>
              <TabPane
                disabled
                tab={
                  <div className='flex items-center w-32 justify-center text-sm'>
                    <MdDescription className='mr-2' /> Solution{' '}
                  </div>
                }
                key='solution'
              >
                <div className='flex flex-col flex-grow px-6'>asd</div>
              </TabPane>
              <TabPane
                tab={
                  <div className='flex items-center w-32 justify-center text-sm'>
                    <MdDescription className='mr-2' /> Discuss{' '}
                  </div>
                }
                key='3'
              >
                <Redirect
                  to={{
                    pathname: '/problem/asd/discuss',
                    state: {
                      postData: {
                        id: 123,
                        name: 'Running Sum of 1d Array',
                      },
                    },
                  }}
                />
              </TabPane>
              <TabPane
                tab={
                  <div className='flex items-center w-32 justify-center text-sm'>
                    <MdDescription className='mr-2' /> Submissions{' '}
                  </div>
                }
                key='submission'
              >
                <div className='w-full p-4'>
                  <Skeleton active loading={loading}>
                    {submitResponse && (
                      <span
                        className={`text-lg ${
                          submitResponse.status === 'Accepted'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {submitResponse.status}
                      </span>
                    )}

                    {submitResponse && submitResponse.status === 'Accepted' && (
                      <>
                        <br />
                        <span className='text-gray-700 text-md mt-2'>
                          Runtime:{' '}
                          {Number(submitResponse.time_used[0]).toFixed(1) +
                            'ms'}
                        </span>
                      </>
                    )}

                    {submitResponse &&
                      submitResponse.status === 'Wrong Answer' && (
                        <>
                          <br />
                          <div className='flex w-full flex-col'>
                            <div className='w-full py-2'>
                              <span className='text-sm text-gray-700 mr-3'>
                                Input{' '}
                              </span>
                              <input
                                className='px-3 py-2 border border-gray-400 rounded-md w-full'
                                value={submitResponse.input}
                                disabled
                              />
                            </div>
                            <div className='w-full py-2'>
                              <span className='text-sm text-gray-700 mr-3'>
                                Your output{' '}
                              </span>
                              <input
                                className='px-3 py-2 border border-gray-400 rounded-md w-full'
                                value={submitResponse.output}
                                disabled
                              />
                            </div>
                            <div className='w-full py-2 mb-8'>
                              <span className='text-sm text-gray-700 mr-3'>
                                Expected output{' '}
                              </span>
                              <input
                                className='px-3 py-2 border border-gray-400 rounded-md w-full'
                                value={submitResponse.expected_answer}
                                disabled
                              />
                            </div>
                          </div>
                        </>
                      )}

                    {submitResponse &&
                      submitResponse.status !== 'Accepted' &&
                      submitResponse.status !== 'Wrong Answer' && (
                        <>
                          <br />
                          <div className='text-red-800 bg-red-200 px-3 py-4 text-md mt-2 w-full mb-5'>
                            {submitResponse.stderr}
                          </div>
                        </>
                      )}
                  </Skeleton>
                  <Table
                    size='small'
                    columns={columns}
                    dataSource={submissions.map((el, index) => {
                      el.key = el.updatedAt;
                      return el;
                    })}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>

          <div className='w-1/2 h-full max-h-full flex flex-col overflow-hidden'>
            <div
              className='border border-t border-b flex items-center'
              style={{ height: '36px' }}
            >
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

            <div className='flex flex-1'>
              <CodeMirror
                value={SampleCode[language].code}
                options={{
                  theme: 'idea',
                  lineNumbers: true,
                  autoRefresh: true,
                  mode: SampleCode[language].codemirror,
                  matchBrackets: true,
                  tabSize: 2,
                  smartIndent: true,
                  autoCloseBrackets: true,
                  styleActiveLine: true,
                  foldGutter: true,

                  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                }}
                onChange={(editor, data, value) => {
                  setCode(value);
                }}
                className='w-full'
              />
            </div>

            <div className='w-full border-t border-gray-200 flex-shrink-0'>
              <Tabs
                onChange={() => {}}
                type='card'
                tabBarGutter={0}
                activeKey={consoleTab}
              >
                <TabPane
                  tab={<span className='w-12 text-xs'>Testcase</span>}
                  key='testcase'
                >
                  <span className='w-12'>
                    set custom testcase (Not implemented)
                  </span>
                </TabPane>
                <TabPane
                  tab={<span className='w-12 text-xs'>Run Code Result</span>}
                  key='runcode'
                >
                  <span className='w-12'></span>
                </TabPane>
                <TabPane
                  tab={<span className='w-12 text-xs'>Debugger</span>}
                  key='debugger'
                  disabled
                >
                  <span className='w-12'>Content of Tab Pane 1</span>
                </TabPane>
              </Tabs>
            </div>

            <div className='h-12 w-full px-3 flex items-center py-3 border-t border-gray-200'>
              <span className='flex items-center text-xs'>
                Console <FaCaretUp className='ml-1' />
              </span>
              <div className='flex ml-auto'>
                <button className='px-4 py-2 border border-gray-400 rounded-md focus:outline-none flex items-center'>
                  <FaPlayCircle className='mr-2' />
                  Run code
                </button>
                <button
                  className='ml-4 px-5 py-2 border border-gray-400 rounded-md focus:outline-none flex items-center text-white'
                  style={{ backgroundColor: 'rgb(69, 90, 100)' }}
                  onClick={submitCodeHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
