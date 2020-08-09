import React, { useEffect, useState, useRef } from 'react';
import { FaCaretUp, FaCaretDown, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  Avatar,
  Tag,
  Menu,
  Spin,
  Pagination,
  Popconfirm,
  Modal,
} from 'antd';
import { useSelector } from 'react-redux';
import { TiPin } from 'react-icons/ti';
import CommentWithAction from '../../../components/Forum/Comment';
import ReactMarkdown from 'react-markdown';
import API from '../../../api';
import Layout from '../../../hocs/Layout';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import '../../../assets/fix-markdown.css';
import CommentEditor from '../../../components/Forum/CommentEditor';
import Editor from '../../../components/Forum/Editor';

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Post = (props) => {
  const [postData, setPostData] = useState(null);
  const [currentVote, setCurrentVote] = useState(null);
  const [comments, setComments] = useState({ count: 0, data: [] });
  const [content, setContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [currentSort, setCurrentSort] = useState('DESC');
  const [mode, setMode] = useState('0');
  const editorRef = useRef(null);
  const username = useSelector((state) => state.global.userData.username);

  const [value, setValue] = useState({
    title: '',
    tags: [],
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const changeVoteHandler = async (typeVote) => {
    if (currentVote === typeVote) return;
    try {
      await API.post('discuss/' + props.match.params.discussId + '/vote', {
        typeVote: typeVote,
      });
      setCurrentVote(typeVote);
      const value = typeVote === 'up' ? 1 : -1;
      const newPostData = { ...postData };
      if (currentVote) {
        newPostData.upVote += value;
        newPostData.downVote -= value;
      } else {
        if (value > 0) {
          newPostData.upVote += value;
        } else newPostData.downVote -= value;
      }
      setPostData(newPostData);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    (async function () {
      const [postData, voteData] = await Promise.allSettled([
        API.get('discuss/' + props.match.params.discussId),
        API.get('discuss/' + props.match.params.discussId + '/vote'),
        API.put('discuss/' + props.match.params.discussId + '/view'),
      ]);
      console.log('Post: ', postData);

      console.log('Votes: ', voteData);

      setPostData(postData.value.data.discuss);
      const currentTag = postData.value.data.discuss.Tags.map(
        (tag) => tag.content
      );

      setCurrentVote(voteData.value?.data?.vote?.typeVote || null);
      setValue({
        ...value,
        title: postData.value.data.discuss.title,
        tags: currentTag,
      });
    })();
  }, [props.match.params.discussId]);

  useEffect(() => {
    (async function () {
      const commentData = await API.get(
        'discuss/' +
          props.match.params.discussId +
          `/comment?page=${currentPage}&sort=${currentSort}&parentId=` +
          null
      );
      console.log(commentData);

      setComments({
        count: commentData.data.data.count,
        data: [...commentData.data.data.comments],
      });
    })();
  }, [props.match.params.discussId, currentPage, currentSort]);

  const onSendHandler = async () => {
    const val = content.trim();
    if (val.length === 0) return;
    const response = await API.post(
      'discuss/' + props.match.params.discussId + '/comment',
      {
        content: val,
        parentId: null,
      }
    );

    const newComments = comments.data.slice();
    if (newComments.length >= 10) newComments.pop();
    setComments({
      count: comments.count + 1,
      data: [response.data.data, ...newComments],
    });
    setContent('');
    console.log(response);
  };

  const handleChangeSortType = (e) => {
    if (currentSort === e.key) return;
    setCurrentSort(e.key);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.state.text = postData.content;
    }
  }, [editMode]);

  const onUpdateItemHandler = async () => {
    setLoading(true);
    setValue({ ...value, isLoading: true });
    const title = value.title.trim();
    const content = editorRef.current.state.text.trim();
    if (title.length === 0 || content.length === 0) {
      setIsError(true);
      setLoading(false);
      return;
    }
    try {
      await API.put('discuss/' + props.match.params.discussId, {
        ...value,
        content: content,
        previousTags: postData.Tags.map((tag) => tag.content),
      });

      setLoading(false);
      setEditMode(false);

      setPostData({
        ...postData,
        title: title,
        content: content,
        Tags: value.tags.map((tag) => ({ content: tag })),
      });
    } catch (err) {
      setLoading(false);
      Modal.error({
        title: 'Error occurs.',
        content: 'Cannot update content of the post.',
      });
    }
  };

  const deleteRootComment = (commentId) => {
    setComments({
      count: comments.count - 1,
      data: comments.data.filter((c) => c.id !== commentId),
    });
  };

  const onDeleteItemHandler = async () => {
    try {
      await API.delete('discuss/' + props.match.params.discussId);

      props.history.replace('/discuss');
    } catch (err) {
      Modal.error({
        title: 'Error occurs.',
        content: 'Cannot update content of the post.',
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(245,245,245)' }}>
      <Layout className='min-h-screen relative'>
        <div className='container mt-6 '>
          <div className='bg-white rounded-sm shadow-md pb-6 mb-8'>
            {postData ? (
              <>
                <div className='flex py-3 border-b border-gray-200'>
                  <Link to='/discuss'>
                    <div className='flex inline-flex items-center text-gray-700 py-1 px-4 border-r border-gray-200'>
                      <svg
                        viewBox='0 0 24 24'
                        width='1em'
                        height='1em'
                        className='fill-current'
                      >
                        <path
                          fillRule='evenodd'
                          d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'
                        ></path>
                      </svg>
                      <span className='ml-1'> Back</span>
                    </div>
                  </Link>
                  <div className='flex justify-between flex-grow'>
                    <div className='text-lg flex items-center ml-3'>
                      <Tooltip placement='top' title={'Pinned'}>
                        <TiPin className='text-2xl mr-2' />
                      </Tooltip>

                      <h3 className='text-md'>{postData.title}</h3>
                    </div>

                    {username === postData.authorUsername && (
                      <div className='flex items-center px-4 text-gray-700'>
                        <svg
                          viewBox='0 0 24 24'
                          width='1.2em'
                          height='1.2em'
                          className='fill-current mr-5'
                          onClick={() => {
                            setEditMode(true);
                            setMode('1/2');
                            console.log(editorRef.current);
                          }}
                        >
                          <path
                            fillRule='evenodd'
                            d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
                          ></path>
                        </svg>
                        <Popconfirm
                          placement='bottom'
                          title={'Are you sure to delete this discussion.'}
                          onConfirm={onDeleteItemHandler}
                          okText='Yes'
                          cancelText='No'
                        >
                          <svg
                            viewBox='0 0 24 24'
                            width='1.2em'
                            height='1.2em'
                            className='fill-current'
                          >
                            <path
                              fillRule='evenodd'
                              d='M5 19V7h14v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2zM7 9v10h10V9H7zm7.5-5H20v2H4V4h5.5l1-1h3l1 1zM9 11h2v8H9v-8zm4 0h2v8h-2v-8z'
                            ></path>
                          </svg>
                        </Popconfirm>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex'>
                  <div
                    className='flex flex-col items-center py-2 px-5'
                    style={{ width: '82.77px' }}
                  >
                    <button
                      className={`rounded-md px-4 py-2 ${
                        currentVote === 'up'
                          ? 'bg-gray-700 text-gray-100'
                          : 'bg-gray-200 text-gray-700'
                      } focus:outline-none`}
                      onClick={() => changeVoteHandler('up')}
                    >
                      <FaCaretUp />
                    </button>
                    <span className='text-sm text-gray-600 py-2'>
                      {postData.upVote - postData.downVote}
                    </span>
                    <button
                      className={`rounded-md px-4 py-2 ${
                        currentVote === 'down'
                          ? 'bg-gray-700 text-gray-100'
                          : 'bg-gray-200 text-gray-700'
                      } focus:outline-none`}
                      onClick={() => changeVoteHandler('down')}
                    >
                      <FaCaretDown />
                    </button>
                  </div>

                  <div className='flex-grow'>
                    <div className='my-2 flex text-gray-500 items-center text-xs'>
                      <Avatar size={32} src={postData.authorAvatar} />
                      <span className='ml-2'>{postData.authorUsername}</span>
                      <span className='ml-4 flex items-center'>
                        <svg
                          viewBox='0 0 24 24'
                          width='1em'
                          height='1em'
                          className='fill-current text-md mr-1'
                        >
                          <path
                            fillRule='evenodd'
                            d='M13.133 14.065C15.941 14.363 20 15.68 20 18v2H4v-2c0-2.321 4.059-3.637 6.867-3.935L10.5 17l1.5 1 1.5-1-.367-2.935zM12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'
                          ></path>
                        </svg>
                        Super Admin
                      </span>
                      <span className='ml-4'>
                        Last Edit: {dayjs(postData.updatedAt).fromNow()}
                      </span>
                      <span className='ml-4'>{postData.View.view} Views</span>
                    </div>
                    <div className='mt-2 markdown-body p-3'>
                      {/* prettier-ignore */}
                      <ReactMarkdown source={postData.content} />
                    </div>
                    <div className='flex mt-4'>
                      {postData.Tags.map((tag, index) => (
                        <Tag key={index}>{tag.content}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className='flex pl-5 mt-8 justify-between w-full'
                  style={{
                    backgroundColor: '#fafafa',
                  }}
                >
                  <span
                    className='flex items-center'
                    style={{
                      color: 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    <FaComment />{' '}
                    <span className='text-xs ml-2'>
                      Comments : {comments.count}
                    </span>
                  </span>

                  <Menu
                    className='text-xs bg-gray-100 flex items-center border-0'
                    theme='light'
                    mode='horizontal'
                    onClick={handleChangeSortType}
                    defaultSelectedKeys={['newest-to-oldest']}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <Menu.Item key='DESC'>Newest To Oldest</Menu.Item>
                    <Menu.Item key='ASC'>Oldest To Newest</Menu.Item>
                  </Menu>
                </div>
                <CommentEditor
                  content={content}
                  setContent={setContent}
                  onSendHandler={onSendHandler}
                />
                <div className='px-4'>
                  {comments.data.map((comment, index) => {
                    return (
                      <CommentWithAction
                        key={comment.id}
                        commentData={comment}
                        parentId={comment.id}
                        currentUsername={username}
                        deleteRoot={deleteRootComment}
                        isRoot
                        discussId={props.match.params.discussId}
                      />
                    );
                  })}
                </div>

                <div className='w-full py-3 px-8'>
                  <Pagination
                    defaultCurrent={currentPage}
                    total={comments.count}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </>
            ) : (
              <div className='h-64 flex items-center justify-center'>
                <Spin size='large' />
              </div>
            )}
          </div>
        </div>
        {editMode && (
          <Editor
            mode={mode}
            setMode={setMode}
            value={value}
            setValue={setValue}
            isError={isError}
            editorRef={editorRef}
            onSubmit={onUpdateItemHandler}
            loading={isLoading}
          />
        )}
      </Layout>
    </div>
  );
};

export default withRouter(Post);
