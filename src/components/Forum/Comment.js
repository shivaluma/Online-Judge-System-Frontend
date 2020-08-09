import React, { useState } from 'react';
import { FaReply, FaRegComment, FaCommentMedical } from 'react-icons/fa';
import { Comment, Tooltip, Avatar, Spin, Popconfirm, Modal } from 'antd';
import moment from 'moment';
import CommentEditor from './CommentEditor';
import API from '../../api';
import { Link } from 'react-router-dom';

const CommentWithAction = ({
  discussId,
  parentId,
  commentData,
  isRoot,
  deleteChild,
  deleteRoot,
  setShowParentEditor,
  setContentParentEditor,
  currentUsername,
}) => {
  const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState('');
  const [page, setCurrentPage] = useState(1);
  const [childComments, setChildComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChild, setShowChild] = useState(false);

  const onSendCommentHandler = async () => {
    const val = content.trim();
    if (val.length === 0) return;

    const response = await API.post('discuss/' + discussId + '/comment', {
      content: val,
      parentId: parentId,
    });

    setContent('');
    setShowEditor(false);

    if (childComments.length >= 10) childComments.shift();
    setChildComments([...childComments, { ...response.data.data }]);
  };



  const loadChildCommentsHandler = async (commentId) => {
    setLoading(true);
    const response = await API.get(
      'discuss/' +
        discussId +
        '/comment?page=' +
        page +
        '&parentId=' +
        commentId +
        '&sort=DESC'
    );

    setChildComments([...childComments, ...response.data.data.comments]);

    setCurrentPage(page + 1);

    setLoading(false);
  };

  let actions = [
    <span
      key='comment-basic-reply-to'
      onClick={() => {
        if (isRoot) {
          setShowEditor(true);
          return;
        }
        setShowParentEditor(true);
        setContentParentEditor('@' + commentData.authorUsername + ' ');
      }}
    >
      <FaReply className='inline-block mr-2' />
      Reply to
    </span>,
  ];

  const deleteChildComment = (childId) => {
    setChildComments(childComments.filter((comment) => comment.id !== childId));
    
  };

  const onDeleteItemHandler = async () => {
    try {
      await API.delete('discuss/' + discussId + '/comment/' + commentData.id);
      if (isRoot) {
        deleteRoot(commentData.id);
      } else {
        deleteChild(commentData.id);
      }
    } catch (err) {
      console.log(err);
      Modal.error({
        title: 'Error occurs.',
        content: 'Cannot delete the comment.',
      });
    }
  };

  if (isRoot) {
    actions.push(
      <span
        key='comment-basic-reply-to-2'
        onClick={() => {
          if (showChild) {
            setShowChild(false);
            return;
          }

          commentData.subComment > 0 &&
            loadChildCommentsHandler(commentData.id);
          setShowChild(true);
        }}
      >
        <FaRegComment className='inline-block mr-2' />
        {showChild ? 'Hide' : 'Show'} {commentData.subComment} replies
      </span>
    );
  }

  if (currentUsername === commentData.authorUsername) {
    actions.push(
      <div
        key='comment-edit-delete'
        className='group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex'
      >
        <span className='text-xs cursor-pointer' onClick={() => {}}>
          <svg
            viewBox='0 0 24 24'
            width='1em'
            height='1em'
            className='fill-current inline-block'
          >
            <path
              fillRule='evenodd'
              d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
            ></path>
          </svg>{' '}
          Edit
        </span>

        <Popconfirm
          placement='bottom'
          title={'Are you sure to delete this comment.'}
          onConfirm={onDeleteItemHandler}
          okText='Yes'
          cancelText='No'
        >
          <span className='text-xs ml-3 cursor-pointer' onClick={() => {}}>
            <svg
              viewBox='0 0 24 24'
              width='1em'
              height='1em'
              className='fill-current inline-block'
            >
              <path
                fillRule='evenodd'
                d='M5 19V7h14v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2zM7 9v10h10V9H7zm7.5-5H20v2H4V4h5.5l1-1h3l1 1zM9 11h2v8H9v-8zm4 0h2v8h-2v-8z'
              ></path>
            </svg>
            Delete
          </span>
        </Popconfirm>
      </div>
    );
  }

  const parsedContent = commentData.content.split(' ').map((word, index) => {
    if (word[0] === '@') {
      return (
        <Link key={index} to={'/profile/' + word.substr(1, word.length)}>
          <span className='text-blue-800'>{word}</span>{' '}
        </Link>
      );
    }
    return <React.Fragment key={index}>{word + ' '}</React.Fragment>;
  });
  return (
    <Comment
      actions={actions}
      className='group'
      author={
        <Link to={'/profile/' + commentData.authorUsername}>
          {commentData.authorUsername}
        </Link>
      }
      avatar={
        <Avatar
          src={commentData.authorAvatar}
          alt={commentData.authorUsername}
        />
      }
      content={<p>{parsedContent}</p>}
      datetime={
        <Tooltip
          title={moment(`${commentData.createdAt}`).format(
            'YYYY-MM-DD HH:mm:ss'
          )}
        >
          <span>{moment(`${commentData.createdAt}`).fromNow()}</span>
        </Tooltip>
      }
    >
      {showEditor && (
        <div className='-mt-6'>
          <CommentEditor
            content={content}
            setContent={setContent}
            toggleEditor={() => setShowEditor(false)}
            onSendHandler={onSendCommentHandler}
            disabled
          />
        </div>
      )}
      {loading ? (
        <div className='h-32 flex items-center justify-center'>
          <Spin size='large' />
        </div>
      ) : showChild ? (
        <>
          {childComments.map((comment) => (
            <CommentWithAction
              key={comment.id}
              discussId={discussId}
              commentData={comment}
              parentId={parentId}
              currentUsername={currentUsername}
              deleteChild={deleteChildComment}
              setShowParentEditor={setShowEditor}
              setContentParentEditor={setContent}
              isRoot={false}
            />
          ))}

          {childComments.length < commentData.subComment && (
            <div
              className='text-md text-blue-600 flex items-center ml-5 focus:outline-none'
              tabIndex={-1}
              onClick={() => loadChildCommentsHandler(commentData.id)}
            >
              <FaCommentMedical />{' '}
              <span className='ml-2 text-xs cursor-pointer'>
                {' '}
                Load more {commentData.subComment - childComments.length}{' '}
                comments...
              </span>
            </div>
          )}
        </>
      ) : null}
    </Comment>
  );
};

export default CommentWithAction;
