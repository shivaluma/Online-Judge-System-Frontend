import React, { useState, useCallback, useRef, useEffect } from 'react';
import Layout from '../../hocs/Layout';
import { Menu, Button, Pagination } from 'antd';
import Editor from '../../components/Forum/Editor';
import PostTile from '../../components/Forum/PostTile';
import { withRouter, Link } from 'react-router-dom';
import API from '../../api';

const Discuss = (props) => {
  const [mode, setMode] = useState('0');
  const [value, setValue] = useState({
    title: '',
    tags: [],
  });

  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const openEditor = useCallback(() => {
    setMode('1/2');
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await API.get('discuss?page=' + currentPage);
        setPostCount(data.count);
        setPosts([...data.posts]);
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, [currentPage]);

  const [isError, setIsError] = useState(false);
  const editorRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const onSubmitHandler = useCallback(async () => {
    setLoading(true);
    const title = value.title.trim();
    const content = editorRef.current.state.text.trim();
    if (title.length === 0 || content.length === 0) {
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      const body = {
        ...value,
        content,
      };
      console.log(body);
      const response = await API.post('discuss', body);
      props.history.push('/discuss/' + response.data.data.discussId);
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  }, [value]);

  const onPageChangeHandler = (page, pageNum) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ backgroundColor: 'rgb(245,245,245)' }}>
      <Layout className='min-h-screen relative'>
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
            {posts.map((post, index) => (
              <Link key={index} to={props.match.path + '/' + post.id}>
                <PostTile post={post} />
              </Link>
            ))}
            <div className='px-6 py-2 border-t'>
              <Pagination
                onChange={onPageChangeHandler}
                defaultCurrent={1}
                total={postCount}
              />
            </div>
          </div>
        </div>
        <Editor
          mode={mode}
          setMode={setMode}
          value={value}
          setValue={setValue}
          isError={isError}
          editorRef={editorRef}
          onSubmit={onSubmitHandler}
          loading={isLoading}
        />
      </Layout>
    </div>
  );
};

export default withRouter(Discuss);
