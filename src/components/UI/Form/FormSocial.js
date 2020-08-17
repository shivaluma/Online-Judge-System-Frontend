import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import Input from './Input';
export default ({
  username,
  email,
  handler,
  submitHandler,
  wrongInfo,
  loading,
  emailServerCheck,
  usernameServerCheck,
}) => {
  return (
    <form className='px-8 mt-8' onSubmit={submitHandler}>
      <Input
        target={username}
        serverCheck={usernameServerCheck}
        handleKey='username'
        handler={handler}
        type='text'
        placeholder='Username...'
      />

      <Input
        target={email}
        serverCheck={emailServerCheck}
        handleKey='email'
        handler={handler}
        type='text'
        placeholder='Email...'
      />

      {wrongInfo.status && !loading ? (
        <span className='block mt-1 text-xs text-left text-red-800'>
          {wrongInfo.description}
        </span>
      ) : null}

      <BeatLoader size={10} color={'#222'} loading={loading} />

      <button
        type='submit'
        className='w-full py-3 mt-8 text-sm text-white bg-blue-600 rounded-md hover:opacity-75 transition-all duration-300 disabled:cursor-not-allowed'
        style={{
          background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
        }}
        disabled={username.error}
      >
        Finish
      </button>
    </form>
  );
};
