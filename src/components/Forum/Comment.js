import React, { useState } from 'react';
import { FaReply, FaRegComment } from 'react-icons/fa';
import { Comment, Tooltip, Avatar, Spin } from 'antd';
import moment from 'moment';
import CommentEditor from './CommentEditor';
import API from '../../api';
import { Link } from 'react-router-dom';
const CommentWithAction = ({
  discussId,
  parentId,
  commentData,
  isRoot,
  setShowParentEditor,
  setContentParentEditor,
}) => {
  const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState('');
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
        '/comment?page=1&parentId=' +
        commentId +
        '&sort=DESC'
    );

    setChildComments(response.data.data.comments);
    setLoading(false);
  };

  const actions = [
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

  if (isRoot) {
    actions.push(
      <span
        key='comment-basic-reply-to'
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
      author={<a>{commentData.authorUsername}</a>}
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
      ) : (
        showChild &&
        childComments.map((comment) => (
          <CommentWithAction
            key={comment.id}
            discussId={discussId}
            commentData={comment}
            parentId={parentId}
            setShowParentEditor={setShowEditor}
            setContentParentEditor={setContent}
            isRoot={false}
          />
        ))
      )}
    </Comment>
  );
};

export default CommentWithAction;
