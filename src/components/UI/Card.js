import React from 'react';
import { FaPlay } from 'react-icons/fa';
export default ({ left, zIndex, scale, className, backgroundImage }) => (
  <div
    className={`relative bg-gray-100 overflow-hidden ${className}`}
    style={{
      height: '300px',
      width: '260px',
      left: `${left}`,
      borderRadius: '20px',
      transformOrigin: '0% 50%',
      transform: `rotateY(350deg) scale(${scale})`,
      zIndex: { zIndex },
    }}
  >
    <div
      className='absolute w-20 h-20 text-center bg-white border border-gray-200 rounded-full shadow-lg'
      style={{
        top: '170px',
        right: '10px',
      }}
    >
      <FaPlay
        className='absolute text-2xl text-gray-400'
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />
    </div>
    <div
      className='bg-red-300'
      style={{
        height: '210px',
        backgroundImage,
      }}
    >
      <div className='p-6'>
        <div className='inline-block w-16 h-3 bg-white rounded-lg opacity-50'></div>
        <div className='inline-block w-32 h-3 ml-3 bg-white rounded-lg opacity-50'></div>
      </div>

      <div className='px-6'>
        <div className='inline-block w-32 h-12 bg-white rounded-lg opacity-50'></div>
        <div className='inline-block w-16 h-12 ml-3 bg-white rounded-lg opacity-50'></div>
      </div>
    </div>

    <div
      className='w-full h-full'
      style={{ background: 'rgba(255,255,255,0.5)' }}
    >
      <div className='inline-block w-24 h-4 mt-8 ml-6 bg-gray-400 rounded-lg'></div>
    </div>
  </div>
);
