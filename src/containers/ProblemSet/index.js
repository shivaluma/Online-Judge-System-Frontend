import React, { useState, useEffect } from 'react';
import { FaThLarge, FaFileCode } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';
import { Select } from 'antd';

import AlgorithmImage from '../../assets/images/algorithm.png';
import DatabaseImage from '../../assets/images/database.png';
import ShellImage from '../../assets/images/shell.png';
import ProblemTable from './Table';
import API from '../../api';
const ProblemSet = () => {
  const { Option } = Select;
  const [problemList, setProblemList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [difficulty, setDifficulty] = useState('');
  const [hasSolution, setHasSolution] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async function () {
      const response = await API.get(
        `/problem?page=${pageNum}&difficulty=${difficulty}&hasSolution=${hasSolution}`
      );
      setProblemList(response.data.problems);
      setLoading(false);
    })();
  }, [pageNum, difficulty, hasSolution, setLoading]);
  return (
    <>
      <Header />
      <div className='container my-8'>
        <div className='flex text-xl font-light items-center'>
          <FaThLarge /> <span className='ml-2'>Category - All</span>
        </div>

        <div className='mt-4 flex'>
          <div
            className='h-24 w-32 rounded-lg'
            style={{ background: 'linear-gradient(#f7dc58, #fea116)' }}
          >
            <div
              className='w-full h-full bg-cover text-center flex items-center justify-center text-white cursor-pointer'
              style={{
                backgroundImage: `url(${AlgorithmImage})`,
              }}
            >
              Algorithms
            </div>
          </div>
          <div
            className='h-24 w-32 rounded-lg ml-5 cursor-not-allowed'
            style={{ background: 'linear-gradient(#70def7, #106afe)' }}
          >
            <div
              className='w-full h-full bg-cover text-center flex items-center justify-center text-white'
              style={{
                backgroundImage: `url(${DatabaseImage})`,
              }}
            >
              Database
            </div>
          </div>
          <div
            className='h-24 w-32 rounded-lg ml-5'
            style={{ background: 'linear-gradient(#8eeb98, #449d44)' }}
          >
            <div
              className='w-full h-full bg-cover text-center flex items-center justify-center text-white cursor-not-allowed'
              style={{
                backgroundImage: `url(${ShellImage})`,
              }}
            >
              Shell
            </div>
          </div>
        </div>

        <div className='mt-6 border-t py-5'>
          <div
            className='rounded-full font-semibold bg-blue-700 inline-block text-white px-2'
            style={{ fontSize: '12px' }}
          >
            12/56 Solved
          </div>
          <span className='px-2 py-1 text-gray-700'>&nbsp;-&nbsp;</span>
          <div
            className='rounded-full font-semibold bg-green-500 inline-block text-white px-2 mr-1'
            style={{ fontSize: '12px' }}
          >
            Easy 12
          </div>
          <div
            className='rounded-full font-semibold bg-orange-500 inline-block text-white px-2 mr-1'
            style={{ fontSize: '12px' }}
          >
            Medium 12
          </div>
          <div
            className='rounded-full font-semibold bg-red-500 inline-block text-white px-2 mr-1'
            style={{ fontSize: '12px' }}
          >
            Hard 12
          </div>
        </div>

        <div className='mt-5 border-t pt-5'>
          <div className='flex items-center'>
            <input
              placeholder='Search question titles or IDs '
              className='flex-grow rounded-full border border-gray-400 outline-none py-1 px-3'
            />
            <AiOutlineFileText className='text-xl mx-2' />
            <Select
              className='rounded-full'
              defaultValue='Difficulty'
              style={{ width: 120 }}
              onChange={(value) => setDifficulty(value.toLowerCase())}
            >
              <Option value='easy'>Easy</Option>
              <Option value='medium'>Medium</Option>
              <Option value='hard'>Hard</Option>
            </Select>
            <Select
              className='rounded-full ml-3'
              defaultValue='Tags'
              style={{ width: 120 }}
              onChange={(value) => {}}
            >
              <Option value='easy'>Array</Option>
              <Option value='medium'>Hash Table</Option>
              <Option value='hard'>Linked List</Option>
            </Select>
          </div>
        </div>
        <div className='mt-5 border-t border-gray-200 py-5'>
          <ProblemTable problems={problemList} loading={loading} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProblemSet;
