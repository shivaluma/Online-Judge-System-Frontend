import React from 'react';

export default ({
  target,
  handleKey,
  handler,
  placeholder,
  type,
  serverCheck,
}) => (
  <div className='w-full mb-5'>
    <input
      className='w-full px-2 py-3 placeholder-gray-500 border border-gray-400 focus:outline-none focus:border-blue-600 transition-all duration-300'
      type={type}
      placeholder={placeholder}
      value={target.value}
      onChange={(event) => handler(event.target.value, handleKey)}
      required
    />

    {target.error ? (
      <span className='block mt-2 text-xs text-left text-red-800'>
        {target.errorDesc}
      </span>
    ) : null}

    {serverCheck && serverCheck.error ? (
      <span className='block mt-2 text-xs text-left text-red-800'>
        {serverCheck.errorDesc}
      </span>
    ) : null}

    {serverCheck && serverCheck.isValid ? (
      <span className='block mt-2 text-xs font-semibold text-left text-green-800'>
        {serverCheck.errorDesc}
      </span>
    ) : null}
  </div>
);
