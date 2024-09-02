import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/counterSlice';



import { IoIosAddCircle } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";


const getOrdinalSuffix = (i) => {
  const j = i % 10;
  const k = i % 100;

  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
};




const Counter = ({idx}) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl  text-gray-800 font-extrabold  mb-4 sevillana-regular">{getOrdinalSuffix(idx)} counter</h1>
      <h1  className="text-4xl   text-gray-800 mb-4 ">{count}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          <FaCircleMinus />
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
        >
          <IoIosAddCircle />
        </button>
      </div>
    </div>
  );
};

export default Counter;
