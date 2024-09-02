import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Counters from './Components/Counters';

const ReduxCounters = () => {
  return (
    <Provider store={store}>
      <h1 class="m-6 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"><mark class="px-4 text-white bg-blue-600 rounded dark:bg-blue-500">Redux</mark> Counters</h1>
      <Counters />
    </Provider>
  );
};

export default ReduxCounters;
