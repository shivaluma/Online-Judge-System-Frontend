import React, { useState, useEffect } from 'react';
import { FaThLarge, FaFileCode } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';
import { Select } from 'antd';
import { useDebounce } from 'use-debounce';
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
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery] = useDebounce(search, 300);
  useEffect(() => {
    setLoading(true);
    (async function () {
      const response = await API.get(
        `/problem/list?page=${pageNum}&searchQuery=${searchQuery}&difficulty=${difficulty}&hasSolution=${hasSolution}`
      );

      setProblemList(response.data.problems);
      setLoading(false);
    })();
  }, [pageNum, difficulty, hasSolution, setLoading, searchQuery]);
  return (
    <>
      <Header />
      <div className='container my-8'>
        <div className='flex items-center text-xl font-light'>
          <FaThLarge /> <span className='ml-2'>Category - All</span>
        </div>

        <div className='flex mt-4'>
          <div
            className='w-32 h-24 rounded-lg'
            style={{ background: 'linear-gradient(#f7dc58, #fea116)' }}
          >
            <div
              className='flex items-center justify-center w-full h-full text-center text-white bg-cover cursor-pointer'
              style={{
                backgroundImage: `url(${AlgorithmImage})`,
              }}
            >
              Algorithms
            </div>
          </div>
          <div
            className='w-32 h-24 ml-5 rounded-lg cursor-not-allowed'
            style={{ background: 'linear-gradient(#70def7, #106afe)' }}
          >
            <div
              className='flex items-center justify-center w-full h-full text-center text-white bg-cover'
              style={{
                backgroundImage: `url(${DatabaseImage})`,
              }}
            >
              Database
            </div>
          </div>
          <div
            className='w-32 h-24 ml-5 rounded-lg'
            style={{ background: 'linear-gradient(#8eeb98, #449d44)' }}
          >
            <div
              className='flex items-center justify-center w-full h-full text-center text-white bg-cover cursor-not-allowed'
              style={{
                backgroundImage: `url(${ShellImage})`,
              }}
            >
              Shell
            </div>
          </div>
        </div>

        <div className='py-5 mt-6 border-t'>
          <div
            className='inline-block px-2 font-semibold text-white bg-blue-700 rounded-full'
            style={{ fontSize: '12px' }}
          >
            12/56 Solved
          </div>
          <span className='px-2 py-1 text-gray-700'>&nbsp;-&nbsp;</span>
          <div
            className='inline-block px-2 mr-1 font-semibold text-white bg-green-500 rounded-full'
            style={{ fontSize: '12px' }}
          >
            Easy 12
          </div>
          <div
            className='inline-block px-2 mr-1 font-semibold text-white bg-orange-500 rounded-full'
            style={{ fontSize: '12px' }}
          >
            Medium 12
          </div>
          <div
            className='inline-block px-2 mr-1 font-semibold text-white bg-red-500 rounded-full'
            style={{ fontSize: '12px' }}
          >
            Hard 12
          </div>
        </div>

        <div className='pt-5 mt-5 border-t'>
          <div className='flex items-center'>
            <input
              placeholder='Search question titles or IDs '
              className='flex-grow px-3 py-1 border border-gray-400 rounded-full outline-none'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <AiOutlineFileText className='mx-2 text-xl' />
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
              className='ml-3 rounded-full'
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
        <div className='py-5 mt-5 border-t border-gray-200'>
          <ProblemTable problems={problemList} loading={loading} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProblemSet;
