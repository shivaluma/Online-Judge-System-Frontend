import React, { useState, useCallback } from 'react';
import Layout from '../../hocs/Layout';
import { Menu, Button, Pagination } from 'antd';
import Editor from '../../components/Forum/Editor';
import PostTile from '../../components/Forum/PostTile';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import Post from './Post';
const Discuss = (props) => {
  const [mode, setMode] = useState('0');
  const [value, setValue] = useState('');
  const openEditor = useCallback(() => {
    setMode('1/2');
  }, []);
  console.log(props);
  return (
    <div style={{ backgroundColor: 'rgb(245,245,245)' }}>
      <Layout className='min-h-screen relative'>
        <Switch>
          <Route path={`${props.match.path}/:postId`} component={Post} />

          <>
            <div className='container mt-8 flex'>
              <div className='w-10/12 bg-white rounded-md border border-gray-300'>
                <div className='text-xl py-2 px-5 text-black border-b border-gray-300'>
                  All Interview Questions
                </div>
                <div className='border-b border-gray-300 flex items-center text-xs bg-gray-100'>
                  <Menu
                    className='w-2/3 text-md bg-gray-100'
                    theme='light'
                    mode='horizontal'
                    defaultSelectedKeys={['1']}
                  >
                    <Menu.Item key='1'>Hot</Menu.Item>
                    <Menu.Item key='2'>Newest To Oldest</Menu.Item>
                    <Menu.Item key='3'>Mote Votes</Menu.Item>
                    <Menu.Item key='5'>Oldest To Newest</Menu.Item>
                  </Menu>
                  <div className='ml-auto mr-3'>
                    <input
                      className='px-2 py-1 rounded-md border border-gray-500'
                      placeholder='Search topics...'
                      style={{ width: '160px', maxHeight: '30px' }}
                    ></input>
                    <Button
                      className='ml-2 rounded-sm'
                      type='primary'
                      onClick={openEditor}
                    >
                      New +
                    </Button>
                  </div>
                </div>
                {[...new Array(10)].map((el, index) => (
                  <Link key={index} to={props.match.path + '/' + index}>
                    <PostTile />
                  </Link>
                ))}
                <div className='px-6 py-2 border-t'>
                  <Pagination defaultCurrent={1} total={10} />
                </div>
              </div>
            </div>
            <Editor
              mode={mode}
              setMode={setMode}
              value={value}
              setValue={setValue}
            />
          </>
        </Switch>
      </Layout>
    </div>
  );
};

export default withRouter(Discuss);
