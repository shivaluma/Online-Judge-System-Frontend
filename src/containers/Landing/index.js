import React from 'react';
import NavButton from '../../components/UI/NavButton';
import ListObj from '../../components/Ipad/ListObj';
import { Link } from 'react-router-dom';
import {
  FaJava,
  FaJs,
  FaPython,
  FaGraduationCap,
  FaQuestion,
  FaTrophy,
  FaUsers,
  FaCode,
  FaHeart,
  FaAngleRight,
} from 'react-icons/fa';
import { ReactComponent as CppSvg } from '../../assets/icons/cpp.svg';
import Card from '../../components/UI/Card';
export default () => (
  <div>
    <div className='relative' style={{ height: '760px', marginTop: '-80px' }}>
      <div
        className='absolute top-0 left-0 w-full h-full transform skew-y-12 bg-green-300'
        style={{
          transformOrigin: '100%',
          background:
            'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)',
          zIndex: '-1',
        }}
      ></div>
      {/* NavBar */}
      <div className='absolute w-full pt-4' style={{ top: '80px' }}>
        <div className='w-full h-24'>
          <div className='container flex justify-between'>
            <div className='text-xl font-normal text-white typo-round'>
              BrosCode
            </div>
            <nav className='flex'>
              <NavButton text='Premium' to='/' color='#fea116' />
              <NavButton text='Explore' to='/problemset' color='#fff' />
              <NavButton text='Discuss' to='/discuss' color='#fff' />
              <NavButton text='Sign In' to='/accounts/login' color='#fff' />
            </nav>
          </div>
        </div>

        <FaJava
          className='absolute z-10 text-gray-600 opacity-50'
          style={{
            top: '100px',
            left: '20px',
            fontSize: '8rem',
            transform: 'rotate(8deg)',
          }}
        />

        <FaJs
          className='absolute z-10 text-gray-600 opacity-50'
          style={{
            top: '80px',
            right: '50px',
            fontSize: '8rem',
            transform: 'rotate(2deg)',
          }}
        />

        <FaPython
          className='absolute z-10 text-gray-600 opacity-50'
          style={{
            top: '280px',
            right: '150px',
            fontSize: '8rem',
            transform: 'rotate(-13deg)',
          }}
        />

        <CppSvg
          className='absolute z-10 w-32 h-32 text-gray-600 opacity-50 fill-current'
          style={{
            top: '70px',
            left: '180px',
            fontSize: '8rem',
            transform: 'rotate(-13deg)',
          }}
        />

        {/* Content Header */}
        <div className='container flex'>
          <div className='lg:w-1/2'>
            <div
              className='relative h-64 mt-20 bg-white shadow-lg w-88'
              style={{
                transform: 'rotate(-8deg)',
                height: '284px',
                width: '414px',
                borderRadius: '25px',
                transformOrigin: '50% 50%',
              }}
            >
              <div
                className='relative flex m-auto border border-gray-300 rounded-md'
                style={{
                  top: '8px',
                  width: 'calc(100% - 38px*2)',
                  height: 'calc(100% - 8px*2)',
                }}
              >
                <div className='w-9/12 p-1'>
                  <div className='flex w-full p-1 bg-gray-200 rounded-md'>
                    <div className='flex w-1/4 h-20 p-1'>
                      <div
                        className='w-full h-full bg-green-400 rounded-lg'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right top, #7700c0, #7302ca, #6e06d5, #660ce0, #5c12eb)',
                        }}
                      ></div>
                    </div>
                    <div className='flex w-1/4 h-20 p-1'>
                      <div
                        className='w-full h-full bg-red-400 rounded-lg'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right bottom, #0ddc99, #00dbb9, #00d9d4, #00d4e7, #20cff2)',
                        }}
                      ></div>
                    </div>
                    <div className='flex w-1/4 h-20 p-1'>
                      <div
                        className='w-full h-full bg-blue-400 rounded-lg'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right bottom, #dc0db8, #e500a8, #ec0198, #f0108a, #f2207c)',
                        }}
                      ></div>
                    </div>
                    <div className='flex w-1/4 h-20 p-1'>
                      <div
                        className='w-full h-full bg-orange-400 rounded-lg'
                        style={{
                          backgroundImage:
                            'linear-gradient(to right bottom, #dccd0d, #e7b500, #ee9b00, #f28107, #f26520)',
                        }}
                      ></div>
                    </div>
                  </div>

                  <div
                    className='w-full p-2 mt-2 border border-gray-300 rounded-lg'
                    style={{ height: 'calc(100% - 100px)' }}
                  >
                    <div className='p-2 border-b border-gray-200'>
                      <ListObj width={'34px'} />
                      <ListObj width={'72px'} red />
                      <ListObj width={'67px'} red />
                      <ListObj width={'54px'} />
                      <ListObj width={'97px'} />
                      <ListObj width={'123px'} red />
                      <ListObj width={'64px'} />
                    </div>
                  </div>
                </div>
                <div className='w-3/12 p-1'>
                  <div className='w-full h-full p-1 border border-gray-300 rounded-md'>
                    <div className='w-full h-4 bg-gray-200 rounded-t-lg'></div>
                    <div className='p-1'>
                      <div
                        className='mx-auto bg-blue-200 rounded-full'
                        style={{ height: '60px', width: '60px' }}
                      ></div>
                    </div>
                    <div className='w-full h-4 bg-gray-200 rounded-b-lg'></div>
                    <div
                      className='mt-3 bg-gray-400 obj-animation'
                      style={{
                        height: '5px',
                        width: '24px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='mt-3 bg-gray-400 obj-animation-d-1'
                      style={{
                        height: '5px',
                        width: '65px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='mt-3 bg-gray-400 obj-animation-d-3'
                      style={{
                        height: '5px',
                        width: '45px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='mt-3 bg-gray-400'
                      style={{
                        height: '5px',
                        width: '24px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='mt-3 bg-gray-400 obj-animation-d-1'
                      style={{
                        height: '5px',
                        width: '24px',
                        borderRadius: '5px',
                      }}
                    ></div>
                    <div
                      className='mt-3 bg-gray-400 obj-animation-d-2'
                      style={{
                        height: '5px',
                        width: '33px',
                        borderRadius: '5px',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Create Account */}
          <div className='lg:w-1/2'>
            <div className='mx-auto mt-24 text-center'>
              <h3 className='w-full text-4xl font-semibold text-white capitalize'>
                A new way to learn
              </h3>
              <p className='mt-8 text-lg text-gray-500'>
                BrosCode is the best platform to help you enhance your skills,
                expand your knowledge and prepare for technical interviews.
              </p>

              <Link to='/accounts/signup'>
                <div className='flex items-center w-48 px-6 py-2 mx-auto mt-8 text-white bg-blue-600 rounded-full focus:outline-none'>
                  <span>Create Account</span>
                  <FaAngleRight className='inline-block ml-2 text-xl' />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='container flex mt-40'>
          <div className='text-right lg:w-1/2'>
            <div className='flex items-center justify-end'>
              <span className='text-2xl text-teal-700'>Start Exploring!</span>
              <div className='transform scale-75 badge teal'>
                <div className='circle'>
                  <FaGraduationCap className='mt-3 ml-3 fa-icon' />
                </div>
              </div>
            </div>
            <p
              className='mt-4 text-base leading-loose text-gray-600'
              style={{ textIndent: '5rem' }}
            >
              Explore is a well-organized tool that helps you get the most out
              of BrosCode by providing structure to guide your progress towards
              the next step in your programming career.
            </p>
          </div>
          <div
            className='relative ml-auto mr-0 lg:w-1/2'
            style={{ perspective: '600px', height: '300px', width: '260px' }}
          >
            <div
              className='absolute w-full h-full'
              style={{ transformOrigin: '0 50%' }}
            >
              <Card
                className='card-floating-2'
                left='-180px'
                zIndex={1}
                scale={0.6}
                backgroundImage={
                  'linear-gradient(to right bottom, #0ddc99, #00dbb9, #00d9d4, #00d4e7, #20cff2)'
                }
              />
            </div>
            <div
              className='absolute w-full h-full'
              style={{ transformOrigin: '0 50%' }}
            >
              <Card
                className='card-floating-1'
                left='-100px'
                zIndex={2}
                scale={0.8}
                backgroundImage={
                  'linear-gradient(to right bottom, #dc0db8, #e500a8, #ec0198, #f0108a, #f2207c)'
                }
              />
            </div>
            <div
              className='absolute w-full h-full'
              style={{ transformOrigin: '0 50%' }}
            >
              <Card
                className='card-floating-0'
                left='0'
                zIndex={3}
                scale={1}
                backgroundImage={
                  'linear-gradient(to right top, #7700c0, #7302ca, #6e06d5, #660ce0, #5c12eb)'
                }
              />
            </div>
          </div>
        </div>

        <div className='container flex mt-40'>
          <div className='mr-20 lg:w-1/2'>
            <div className='relative w-full'>
              <div className='transform scale-75 badge orange'>
                <div className='circle'>
                  <FaQuestion className='mt-3 ml-3 fa-icon' />
                </div>
              </div>

              <div className='transform scale-75 -translate-x-12 badge purple'>
                <div className='circle'>
                  <FaUsers className='mt-3 ml-3 fa-icon' />
                </div>
              </div>

              <div className='transform scale-75 -translate-x-24 badge blue'>
                <div className='circle'>
                  <FaTrophy className='mt-3 ml-3 fa-icon' />
                </div>
              </div>
            </div>

            <h3 className='block text-2xl text-blue-500'>
              Questions, Community & Contests
            </h3>

            <p className='mt-3 leading-loose text-gray-800 text-md'>
              Over 1550 questions for you to practice. Come and join one of the
              largest tech communities with hundreds of thousands of active
              users and participate in our contests to challenge yourself and
              earn rewards.
            </p>
          </div>

          {/* END */}

          <div className='mr-16 lg:w-1/2'>
            <div className='relative w-full'>
              <div className='transform scale-75 badge green'>
                <div className='circle'>
                  <FaCode className='mt-3 ml-3 fa-icon' />
                </div>
              </div>
            </div>

            <h3 className='block text-2xl text-blue-500'>Developer</h3>

            <p className='mt-3 leading-loose text-gray-800 text-md'>
              We now support 14 popular coding languages. At our core, BrosCode
              is about developers. Our powerful development tools such as
              Playground help you test, debug and even write your own projects
              online..
            </p>
          </div>
        </div>
        <div
          className='relative w-full mt-40'
          style={{
            background:
              'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)',
          }}
        >
          <div
            className='absolute transform badge red'
            style={{
              top: 0,
              left: '49%',
              transform: 'translate(-50%, -50%) scale(0.75)',
            }}
          >
            <div className='circle'>
              <FaHeart className='mt-3 ml-3 fa-icon' />
            </div>
          </div>
          <div className='w-1/4 mx-auto -mt-4 text-center text-gray-300'>
            At BrosCode, our mission is to help you improve yourself and land
            your dream job. We have a sizable repository of interview resources
            for many companies. In the past few years, our users have landed
            jobs at top companies around the world.
          </div>

          <div className='flex justify-between w-full px-16 py-6 mt-24 text-white border-gray-300'>
            <span>&copy; Brogrammers 2020.</span>
            <div>About us</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
