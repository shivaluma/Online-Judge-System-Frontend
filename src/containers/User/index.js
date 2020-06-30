import React from 'react';
import Header from '../../components/UI/Header';
import { PieChart } from 'react-minimal-pie-chart';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {
  FaQuestion,
  FaCog,
  FaCheck,
  FaCoins,
  FaLightbulb,
} from 'react-icons/fa';
const User = () => {
  return (
    <>
      <Header />
      <div className='container mt-12 flex'>
        <div className='mr-10' style={{ width: '368px' }}>
          <div className='max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4'>
            <img
              className='w-full h-56 object-cover object-center'
              src='https://image.thanhnien.vn/1080/uploaded/nguyetminh/2018_05_22/trump_sbnf.jpg'
              alt='avatar'
            />
            <div className='flex items-center px-6 py-3 bg-gray-900'>
              <svg
                className='h-6 w-6 text-white fill-current'
                viewBox='0 0 512 512'
              >
                <path d='M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z' />
              </svg>
              <h1 className='mx-3 text-white font-semibold text-lg'>Fapping</h1>
            </div>
            <div className='py-4 px-6'>
              <h1 className='text-2xl font-semibold text-gray-800'>
                Donald Trump
              </h1>
              <p className='py-2 text-lg text-gray-700'>
                Full stack developer at BrosCode.
              </p>
              <div className='flex items-center mt-4 text-gray-700'>
                <svg className='h-6 w-6 fill-current' viewBox='0 0 512 512'>
                  <path d='M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z' />
                  <g>
                    <path d='M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z' />
                  </g>
                </svg>
                <h1 className='px-2 text-sm'>BrosCode</h1>
              </div>
              <div className='flex items-center mt-4 text-gray-700'>
                <svg className='h-6 w-6 fill-current' viewBox='0 0 512 512'>
                  <path d='M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z' />
                </svg>
                <h1 className='px-2 text-sm'>Ho Chi Minh</h1>
              </div>
              <div className='flex items-center mt-4 text-gray-700'>
                <svg className='h-6 w-6 fill-current' viewBox='0 0 512 512'>
                  <path d='M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z' />
                </svg>
                <h1 className='px-2 text-sm'>trump@broscode.com</h1>
              </div>
            </div>
          </div>
          <div class='mb-2 border-solid border-grey-light  border shadow-lg rounded-lg overflow-hidden'>
            <div class='bg-grey-lighter bg-gray-200 px-2 py-3 border-solid border-grey-light border-b'>
              Progress
            </div>
            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <FaQuestion />{' '}
              <span className='ml-3 text-md'>Solved Question</span>
              <span className=' ml-auto px-2 bg-green-500 rounded-lg text-white font-bold text-sm'>
                34 / 1000
              </span>
            </div>
            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <FaCog />{' '}
              <span className='ml-3 text-md'>Accepted Submission</span>
              <span className=' ml-auto px-2 bg-green-500 rounded-lg text-white font-bold text-sm'>
                34 / 38
              </span>
            </div>
            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <FaCheck /> <span className='ml-3 text-md'>Accepted Rate</span>
              <span className=' ml-auto px-2 bg-blue-500 rounded-lg text-white font-bold text-sm'>
                89%
              </span>
            </div>

            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <PieChart
                data={[
                  { title: 'Accepted', value: 34, color: 'rgb(72, 187, 120)' },
                  { title: 'Other', value: 15, color: '#ffcccb' },
                ]}
                radius={PieChart.defaultProps.radius - 7}
                segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={{
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                }}
              />
            </div>
          </div>
          <div class='mb-2 border-solid border-grey-light  border shadow-lg rounded-lg overflow-hidden'>
            <div class='bg-grey-lighter bg-gray-200 px-2 py-3 border-solid border-grey-light border-b'>
              Contribution
            </div>
            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <FaCoins /> <span className='ml-3 text-md'>Point</span>
              <span className=' ml-auto px-2 bg-green-500 rounded-lg text-white font-bold text-sm'>
                1487
              </span>
            </div>
            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <FaQuestion /> <span className='ml-3 text-md'>Question</span>
              <span className=' ml-auto px-2 bg-green-500 rounded-lg text-white font-bold text-sm'>
                12
              </span>
            </div>
            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <FaLightbulb /> <span className='ml-3 text-md'>Solution</span>
              <span className=' ml-auto px-2 bg-blue-500 rounded-lg text-white font-bold text-sm'>
                0
              </span>
            </div>
          </div>
        </div>
        <div className='flex-grow'>
          <div class='mb-2 border-solid border-grey-light  border shadow-lg rounded-lg overflow-hidden my-4'>
            <div class='bg-grey-lighter bg-gray-200 px-2 py-3 border-solid border-grey-light border-b'>
              234 Contributions this year
            </div>
            <div class='p-3 px-4 border-b border-gray-200'>
              <CalendarHeatmap
                startDate={new Date('2019-06-01')}
                endDate={new Date('2020-06-30')}
                values={[
                  { date: '2020-01-01', count: 1 },
                  { date: '2020-01-03', count: 4 },
                  { date: '2020-06-06', count: 949 },
                  // ...and so on
                ]}
              />
            </div>
          </div>
          <div class='mb-2 border-solid border-grey-light  border shadow-lg rounded-lg overflow-hidden my-4'>
            <div class='bg-grey-lighter bg-gray-200 px-2 py-3 border-solid border-grey-light border-b'>
              Most recents submission
            </div>
            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <span className='ml-1 text-sm text-gray-800 font-bold'>
                Two Sum
              </span>
              <div className='ml-auto'>
                <span className='px-2 py-1 mr-3 bg-blue-500 rounded-lg text-white font-bold text-sm'>
                  c++
                </span>

                <span className='px-2 py-1 bg-green-500 rounded-lg text-white font-bold text-sm'>
                  Accepted
                </span>
              </div>
            </div>
            <div class='p-3 flex items-center px-4 border-b border-gray-200'>
              <span className='ml-1 text-sm text-gray-800 font-bold'>
                Perfect Squares
              </span>
              <div className='ml-auto'>
                <span className='px-2 py-1 mr-3 bg-blue-500 rounded-lg text-white font-bold text-sm'>
                  c++
                </span>

                <span className='px-2 py-1 bg-green-500 rounded-lg text-white font-bold text-sm'>
                  Accepted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
