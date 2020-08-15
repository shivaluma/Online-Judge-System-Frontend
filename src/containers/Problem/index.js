import React, { useState } from 'react';
import HeaderWhite from '../../components/UI/Header/HeaderWhite';
import { Tabs, Select, Table } from 'antd';
import { MdDescription } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { FaCaretUp, FaPlayCircle } from 'react-icons/fa';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import SampleCode from '../../utils/sampleCode';
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
const { TabPane } = Tabs;
const { Option } = Select;
const Problem = (props) => {
  const [] = useState(false);
  const [language, changeLanguage] = useState('cpp');
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <div className='h-screen max-h-screen flex flex-col'>
      <HeaderWhite />
      <div className='flex flex-1 w-full'>
        <div className='w-full flex h-full'>
          <div className='w-1/2 flex flex-col justify-start items-stretch flex-stretch'>
            <Tabs
              defaultActiveKey='1'
              type='card'
              size={'small'}
              tabBarGutter={0}
            >
              <TabPane
                tab={
                  <div className='flex items-center w-32 justify-center text-sm'>
                    <MdDescription className='mr-2' /> Description{' '}
                  </div>
                }
                key='1'
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
                    1480. Running Sum of 1d Array
                  </h3>
                  <div className='flex items-center mt-3 pb-4 border-b border-gray-200'>
                    <span className='text-green-500 text-xs font-semibold'>
                      Easy
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
                </div>
              </TabPane>
              <TabPane
                disabled
                tab={
                  <div className='flex items-center w-32 justify-center text-sm'>
                    <MdDescription className='mr-2' /> Solution{' '}
                  </div>
                }
                key='2'
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
                Content of card tab 3
              </TabPane>
              <TabPane
                tab={
                  <div className='flex items-center w-32 justify-center text-sm'>
                    <MdDescription className='mr-2' /> Submissions{' '}
                  </div>
                }
                key='4'
              >
                <div className='w-full p-4'>
                  <Table columns={columns} dataSource={data} />
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
                  smartIndent: true,
                  autoCloseBrackets: true,
                  styleActiveLine: true,
                  foldGutter: true,
                  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                }}
                onChange={(editor, data, value) => {}}
                className='w-full'
              />
            </div>

            <div className='w-full border-t border-gray-200 flex-shrink-0'>
              <Tabs onChange={() => {}} type='card' tabBarGutter={0}>
                <TabPane
                  tab={<span className='w-12 text-xs'>Testcase</span>}
                  key='1'
                >
                  <span className='w-12'>Content of Tab Pane 1</span>
                </TabPane>
                <TabPane
                  tab={<span className='w-12 text-xs'>Run Code Result</span>}
                  key='2'
                >
                  <span className='w-12'>Content of Tab Pane 1</span>
                </TabPane>
                <TabPane
                  tab={<span className='w-12 text-xs'>Debugger</span>}
                  key='3'
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
