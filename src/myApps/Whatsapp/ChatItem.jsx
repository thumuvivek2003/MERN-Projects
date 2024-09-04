const ChatItem = ({ image, name, lastMessage, time, unread }) => {
    return (
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          src={image}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{name}</h3>
            <span className="text-sm text-gray-600">{time}</span>
          </div>
          <p className="text-sm text-gray-500">{lastMessage}</p>
        </div>
        {unread && (
          <div className="w-3 h-3 bg-green-600 rounded-full ml-2"></div>
        )}
      </div>
    );
  };
  
  export default ChatItem;
  