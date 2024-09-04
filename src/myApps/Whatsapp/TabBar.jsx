const TabBar = () => {
    return (
      <div className="flex justify-between bg-gray-100 p-2">
        {["All", "Unread", "Favourites", "Groups"].map((tab) => (
          <button
            key={tab}
            className="flex-1 text-center py-2 font-medium text-gray-700 hover:bg-gray-200 rounded-lg">
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default TabBar;
  