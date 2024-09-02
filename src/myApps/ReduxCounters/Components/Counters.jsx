import React from 'react';
import Counter from './Count';


const Counters = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-200">
      {Array.from({ length: 30 }, (_, i) => (
        <Counter key={i} idx={i+1}/>
      ))}
    </div>
  );
};

export default Counters;