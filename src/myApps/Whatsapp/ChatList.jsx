import ChatItem from "./ChatItem";
const chats = [
    {
      image: "https://example.com/avatar1.png",
      name: "CSE 4D Squad",
      lastMessage: "Himaja 3D GD: Happy Birthday Naga Du...",
      time: "6:10 pm",
      unread: true,
    },
    // Add other chat items similarly
  ];
  
  const ChatList = () => {
    return (
      <div className="flex flex-col overflow-y-auto">
        {chats.map((chat, index) => (
          <ChatItem key={index} {...chat} />
        ))}
      </div>
    );
  };
  
  export default ChatList;
  