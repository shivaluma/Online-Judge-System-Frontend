import React, { useEffect, useState } from 'react';
import { FaCaretUp, FaCaretDown, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Tooltip, Avatar, Tag, Menu, Spin } from 'antd';
import { TiPin } from 'react-icons/ti';
import TextArea from 'antd/lib/input/TextArea';
import CommentWithAction from '../../../components/Forum/Comment';
import ReactMarkdown from 'react-markdown';
import API from '../../../api';
import Layout from '../../../hocs/Layout';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import '../../../assets/fix-markdown.css';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Post = (props) => {
  const [postData, setPostData] = useState(null);
  const [currentVote, setCurrentVote] = useState(null);

  const changeVoteHandler = async (typeVote) => {
    try {
      const voteResult = await API.post(
        'discuss/' + props.match.params.discussId + '/vote',
        {
          typeVote: typeVote,
        }
      );
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
      try {
        const [postData, voteData] = await Promise.all([
          API.get('discuss/' + props.match.params.discussId),
          API.get('discuss/' + props.match.params.discussId + '/vote'),
        ]);
        setPostData(postData.data.discuss);

        setCurrentVote(voteData.data.vote.typeVote);
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, [props.match.params.discussId]);

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
                  <div className='text-lg flex items-center ml-3'>
                    <Tooltip placement='top' title={'Pinned'}>
                      <TiPin className='text-2xl mr-2' />
                    </Tooltip>

                    <h3 className='text-md'>{postData.title}</h3>
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
                    <span className='text-xs ml-2'>Comments : 24</span>
                  </span>

                  <Menu
                    className='text-xs bg-gray-100 flex items-center border-0'
                    theme='light'
                    mode='horizontal'
                    defaultSelectedKeys={['newest-to-oldest']}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <Menu.Item key='newest-to-oldest'>
                      Newest To Oldest
                    </Menu.Item>
                    <Menu.Item key='oldest-to-newest'>
                      Oldest To Newest
                    </Menu.Item>
                  </Menu>
                </div>

                <div className='m-4 flex'>
                  <TextArea
                    className='outline-none rounded-l-md hover:outline-none'
                    rows={2}
                    style={{ resize: 'none' }}
                    placeholder='Enter comment here (Markdown is supported)...'
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />

                  <div className='w-16 rounded-r-md border-t border-r border-b border-gray-400 flex flex-col items-center overflow-hidden'>
                    <button className='text-xs py-1 border-b border-gray-400 w-full focus:outline-none'>
                      View
                    </button>

                    <button
                      className='text-xs py-1 flex-grow w-full text-white focus:outline-none'
                      style={{
                        background: 'linear-gradient(35deg, #546e7a, #37474f)',
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
                <div className='px-4'>
                  <CommentWithAction>
                    <CommentWithAction />
                  </CommentWithAction>
                  <CommentWithAction />
                  <CommentWithAction />
                </div>
              </>
            ) : (
              <div className='h-64 flex items-center justify-center'>
                <Spin size='large' />
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default withRouter(Post);
