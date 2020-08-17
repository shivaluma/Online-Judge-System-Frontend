/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import Layout from '../../hocs/Layout';
import { Menu, Button, Pagination, Empty, Spin, Tabs } from 'antd';
import Editor from '../../components/Forum/Editor';
import PostTile from '../../components/Forum/PostTile';
import { withRouter, Link } from 'react-router-dom';
import API from '../../api';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import AuthModal from '../Auth/AuthModal';
import Search from 'antd/lib/input/Search';
import TagWithCount from '../../components/UI/Tag/TagWithCount';
import { MdDescription } from 'react-icons/md';
import { Redirect } from 'react-router-dom';
const { TabPane } = Tabs;
const Discuss = (props) => {
  const [mode, setMode] = useState('0');
  const [value, setValue] = useState({
    title: '',
    tags: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState({
    page: 1,
    orderBy: 'newest_to_oldest',
    search: '',
    isSet: false,
  });

  const [tagData, setTagData] = useState({
    total: 0,
    tags: [],
  });
  const [tagQuery, setTagQuery] = useState('');
  const [tagSelect, setTagSelect] = useState([]);
  const [searchQuery] = useDebounce(query.search, 400);
  const [tagQueryDebounce] = useDebounce(tagQuery, 200);
  const isLogin = useSelector((state) => state.global.currentUser);
  useEffect(() => {
    let params = new URLSearchParams(props.location.search);
    const page = params.get('page') || 1;
    const orderBy = params.get('orderBy') || 'newest_to_oldest';
    const search = params.get('search') || '';
    const tag = params.get('tag');
    const tagArray = Array.isArray(tag) ? tag : !tag ? [] : [tag];
    setTagSelect(tagArray);
    setQuery({ page, orderBy, search, isSet: true });
  }, [props.history]);

  useEffect(() => {
    if (!query.isSet) return;
    setTagLoading(true);
    (async function () {
      const { data } = await API.get(
        `discuss/tags?problem=${
          postData?.id || ''
        }&tag=${tagQueryDebounce}${tagSelect
          .map((el) => `&tags=${el}`)
          .join('')}`
      );
      setTagData(data);
      setTagLoading(false);
    })();
  }, [query.isSet, tagQueryDebounce, tagSelect]);

  useEffect(() => {
    if (query.isSet === false) return;
    (async function () {
      setLoading(true);
      try {
        const { data } = await API.get(
          `discuss?problem=${postData?.id || ''}&page=${query.page}&orderBy=${
            query.orderBy
          }&search=${searchQuery}${tagSelect
            .map((tag) => `&tag=${tag}`)
            .join('')}`
        );

        setPostCount(data.count);
        setPosts([...data.posts]);
      } catch (err) {}
      setLoading(false);
    })();
    props.history.replace({
      pathname: props.location.pathname,
      search: `?page=${query.page}&orderBy=${
        query.orderBy
      }&search=${searchQuery}${tagSelect.map((tag) => `&tag=${tag}`).join('')}`,
      state: { ...props.location.state },
    });
  }, [
    props.location.pathname,
    props.location.search,
    props.history,
    query.page,
    query.orderBy,
    searchQuery,
    query.isSet,
    tagSelect,
  ]);
  const [isError, setIsError] = useState(false);
  const editorRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [isTagLoading, setTagLoading] = useState(false);

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
        problemId: postData?.id || null,
      };

      const response = await API.post('discuss', body);
      setLoading(false);
      props.history.push(
        props.location.pathname + '/' + response.data.data.discussId
      );
    } catch (err) {
      setLoading(false);
    }
  }, [value, props.history]);

  const postData = props?.location?.state?.postData;
  const openEditor = useCallback(() => {
    if (!isLogin) {
      setShowModal(true);
      return;
    }
    setMode('1/2');
  }, [isLogin]);

  const onPageChangeHandler = (page, pageNum) => {
    setQuery({ ...query, page: page });
  };

  const onTagClickHandler = (tagContent) => {
    if (tagSelect.includes(tagContent)) return;
    setTagSelect([...tagSelect, tagContent]);
  };

  const onTagRemoveHandler = (tagContent) => {
    setTagSelect(tagSelect.filter((tag) => tag !== tagContent));
  };

  useEffect(() => {
    setPosts([]);
  }, [postData]);

  return (
    <div style={{ backgroundColor: 'rgb(245,245,245)' }}>
      <Layout className='relative min-h-screen'>
        <div className='container flex mt-8'>
          <div className='w-10/12 bg-white border border-gray-300 rounded-md'>
            {postData && (
              <Tabs
                defaultActiveKey='3'
                type='card'
                size={'small'}
                tabBarGutter={0}
              >
                <TabPane
                  tab={
                    <div className='flex items-center justify-center w-32 text-sm'>
                      <MdDescription className='mr-2' /> Description{' '}
                    </div>
                  }
                  key='1'
                >
                  <Redirect
                    to={{
                      pathname: '/problem/' + postData.id,
                    }}
                  />
                </TabPane>
                <TabPane
                  disabled
                  tab={
                    <div className='flex items-center justify-center w-32 text-sm'>
                      <MdDescription className='mr-2' /> Solution{' '}
                    </div>
                  }
                  key='2'
                ></TabPane>
                <TabPane
                  key='3'
                  tab={
                    <div className='flex items-center justify-center w-32 text-sm'>
                      <MdDescription className='mr-2' /> Discuss{' '}
                    </div>
                  }
                  disabled
                ></TabPane>
                <TabPane
                  tab={
                    <div className='flex items-center justify-center w-32 text-sm'>
                      <MdDescription className='mr-2' /> Submissions{' '}
                    </div>
                  }
                  key='4'
                >
                  <Redirect
                    to={{
                      pathname: '/problem/' + postData.id + '/submission',
                    }}
                  />
                </TabPane>
              </Tabs>
            )}

            <div className='px-5 py-2 text-xl text-black border-b border-gray-300'>
              {postData
                ? `${postData.id}. ${postData.title}`
                : 'All Interview Questions'}
            </div>
            <div className='flex items-center text-xs bg-gray-100 border-b border-gray-300'>
              <Menu
                className='w-2/3 bg-gray-100 text-md'
                theme='light'
                mode='horizontal'
                onClick={(e) => {
                  setQuery({ ...query, orderBy: e.key });
                }}
                defaultSelectedKeys={['newest_to_oldest']}
              >
                <Menu.Item key='newest_to_oldest'>Newest To Oldest</Menu.Item>
                <Menu.Item key='most_vote'>Most Votes</Menu.Item>
                <Menu.Item key='recent_activity'>Recent Activity</Menu.Item>
                <Menu.Item key='oldest_to_newest'>Oldest To Newest</Menu.Item>
              </Menu>
              <div className='ml-auto mr-3'>
                <input
                  className='px-2 py-1 border border-gray-500 rounded-md'
                  placeholder='Search topics...'
                  value={query.search}
                  onChange={(event) =>
                    setQuery({ ...query, search: event.target.value })
                  }
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
            {!isLoading &&
              posts.map((post, index) => (
                <Link key={index} to={props.match.url + '/' + post.id}>
                  <PostTile post={post} />
                </Link>
              ))}

            {isLoading && (
              <div className='flex items-center justify-center w-full h-64'>
                <Spin size='large' />
              </div>
            )}

            {!isLoading && posts.length === 0 && <Empty className='py-20' />}

            <div className='px-6 py-2 border-t'>
              <Pagination
                onChange={onPageChangeHandler}
                defaultCurrent={1}
                total={postCount}
              />
            </div>
          </div>
          <div className='self-start w-3/12 ml-2 bg-white border border-gray-300 rounded-md'>
            <div className='flex items-center h-12 px-3 text-black text-gray-700 border-b border-gray-200 border-gray-300 text-md'>
              Tags
            </div>
            <div className='px-3 py-4'>
              <div className='flex flex-wrap max-w-full mb-3'>
                {tagSelect.map((tag, index) => (
                  <TagWithCount
                    key={tag}
                    text={tag}
                    isSelected
                    onClick={onTagClickHandler}
                    onRemove={onTagRemoveHandler}
                  />
                ))}
              </div>
              <Search
                placeholder='Search for tags...'
                onChange={(event) => setTagQuery(event.target.value)}
                className='w-full py-1 rounded-md'
              />
              <div className='flex flex-wrap max-w-full mt-4'>
                {!isTagLoading &&
                  tagData.tags.map((tag) => (
                    <TagWithCount
                      key={tag.id}
                      text={tag.content}
                      count={tag.count}
                      onClick={onTagClickHandler}
                    />
                  ))}

                {isTagLoading && (
                  <div className='flex items-center justify-center w-full h-64'>
                    <Spin size='large' />
                  </div>
                )}
              </div>
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

        <Modal
          visible={showModal}
          footer={null}
          width={400}
          bodyStyle={{ padding: 0 }}
          onCancel={() => {
            setShowModal(false);
          }}
        >
          <AuthModal
            isLoginMode={true}
            hideModal={setShowModal}
            history={props.history}
          />
        </Modal>
      </Layout>
    </div>
  );
};

export default withRouter(Discuss);
