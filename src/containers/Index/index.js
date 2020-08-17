import React from 'react';
import { FaChartLine, FaTrophy, FaComments } from 'react-icons/fa';
import Header from '../../components/UI/Header';
import TrendingPost from '../../components/Forum/TrendingPost';
import Footer from '../../components/UI/Footer';
export default () => {
  return (
    <>
      <Header />
      <div className='container flex my-8' style={{ maxWidth: '1000px' }}>
        <div className='w-2/3 mr-10 border-r border-gray-200'>
          <div className='flex items-center py-3 text-2xl'>
            <FaChartLine />{' '}
            <span className='pl-3 font-thin text-gray-700'>Trending Posts</span>
          </div>

          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
        </div>
        <div className='flex flex-col px-1 mt-8'>
          <div
            className='flex flex-col w-full h-40 p-3 rounded-lg'
            style={{
              background:
                'linear-gradient(-150deg,#424141 15%,#4e5056 70%,#505b6b 94%)',
            }}
          >
            <h3 className='pt-3 text-lg text-gray-200'>Want to contribute?</h3>

            <span className='mt-2 text-sm text-gray-400'>
              Help the community, earn up to 10000 BrosCoin
            </span>

            <button className='flex-wrap self-end w-24 p-2 mt-2 text-sm text-gray-100 border border-gray-100 rounded-md'>
              Contribute
            </button>
          </div>

          <div className='flex w-full h-40 p-3 mt-12 border border-gray-300 rounded-lg'>
            <div className='flex flex-col'>
              <h3 className='pt-3 text-lg text-gray-800'>BrosCode Contest</h3>

              <span className='mt-2 text-sm text-gray-600'>
                Participate and win your prizes.
              </span>

              <button className='flex-wrap p-1 mt-8 text-sm border border-gray-800 rounded-md'>
                Join Contest
              </button>
            </div>

            <div className='flex items-center mx-auto'>
              <FaTrophy className='text-4xl text-orange-600' />
            </div>
          </div>

          <div className='flex w-full h-40 p-3 mt-12 border border-gray-300 rounded-lg'>
            <div className='flex items-center mx-auto'>
              <FaComments className='text-4xl text-blue-600' />
            </div>

            <div className='flex flex-col'>
              <h3 className='pt-3 text-lg text-gray-800'>Discuss Now</h3>

              <span className='mt-2 text-sm text-gray-600'>
                Share interview experiences.
              </span>

              <button className='flex-wrap p-1 mt-8 text-sm border border-gray-800 rounded-md'>
                Let's Discuss
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
