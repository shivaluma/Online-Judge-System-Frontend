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
          <div className='py-3 flex items-center text-2xl'>
            <FaChartLine />{' '}
            <span className='text-gray-700 pl-3 font-thin'>Trending Posts</span>
          </div>

          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
        </div>
        <div className='px-1 mt-8 flex flex-col'>
          <div
            className='h-40 w-full rounded-lg p-3 flex flex-col'
            style={{
              background:
                'linear-gradient(-150deg,#424141 15%,#4e5056 70%,#505b6b 94%)',
            }}
          >
            <h3 className='text-gray-200 text-lg pt-3'>Want to contribute?</h3>

            <span className='mt-2 text-sm text-gray-400'>
              Help the community, earn up to 10000 BrosCoin
            </span>

            <button className='mt-2 self-end w-24 flex-wrap text-gray-100 p-2 border-gray-100 border rounded-md text-sm'>
              Contribute
            </button>
          </div>

          <div className='h-40 w-full rounded-lg p-3 flex mt-12 border border-gray-300'>
            <div className='flex flex-col'>
              <h3 className='text-gray-800 text-lg pt-3'>BrosCode Contest</h3>

              <span className='mt-2 text-sm text-gray-600'>
                Participate and win your prizes.
              </span>

              <button className='mt-8 flex-wrap p-1 border border-gray-800 border rounded-md text-sm'>
                Join Contest
              </button>
            </div>

            <div className='flex items-center mx-auto'>
              <FaTrophy className='text-4xl text-orange-600' />
            </div>
          </div>

          <div className='h-40 w-full rounded-lg p-3 flex mt-12 border border-gray-300'>
            <div className='flex items-center mx-auto'>
              <FaComments className='text-4xl text-blue-600' />
            </div>

            <div className='flex flex-col'>
              <h3 className='text-gray-800 text-lg pt-3'>Discuss Now</h3>

              <span className='mt-2 text-sm text-gray-600'>
                Share interview experiences.
              </span>

              <button className='mt-8 flex-wrap p-1 border border-gray-800 border rounded-md text-sm'>
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
