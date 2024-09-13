 

import logo from './svgs/phone-pay.png';

export default function Option() {
  return (
    <div className="flex flex-col w-72 gap-6">
    <select className="appearance-none border rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>      <img src={logo} alt="Phone Pay" />;Horizon UI HTML</option>
        <option>Horizon UI React</option>
        <option>Horizon UI Vue</option>
        <option>Horizon UI Angular</option>
        <option>Horizon UI Svelte</option>
    </select>
    </div>
  );
}