// import { SearchIcon, QrCodeIcon, CameraIcon, DotsHorizontalIcon } from '@heroicons/react/outline';

const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-green-600">WhatsApp</h1>
      <div className="flex items-center space-x-4">
        {/* <SearchIcon className="w-6 h-6 text-gray-600" />
        <QrCodeIcon className="w-6 h-6 text-gray-600" />
        <CameraIcon className="w-6 h-6 text-gray-600" />
        <DotsHorizontalIcon className="w-6 h-6 text-gray-600" /> */}
      </div>
    </div>
  );
};

export default TopBar;
