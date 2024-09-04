import React from "react";

const ChatBubble = ({ message, time, isSender, isEdited, isVoiceNote }) => (
  <div
    className={`flex ${
      isSender ? "justify-end" : "justify-start"
    } my-2 mx-3`}
  >
    <div className={`max-w-xs p-3 rounded-lg ${isSender ? "bg-green-100" : "bg-white"} shadow`}>
      <p className="text-sm">{message}</p>
      {isVoiceNote && (
        <div className="mt-2 flex items-center">
          <button className="text-blue-500">
            <i className="fas fa-play"></i>
          </button>
          <div className="ml-2 text-xs text-gray-600">0:29</div>
        </div>
      )}
      <div className="flex justify-end mt-1">
        <span className="text-xs text-gray-500">{time}</span>
        {isEdited && <span className="text-xs text-gray-500 ml-1">Edited</span>}
      </div>
    </div>
  </div>
);

const ChatWindow = () => (
  <div className="bg-gray-100 w-full h-screen flex flex-col">
    <div className="bg-white p-3 shadow-lg flex items-center">
      <button className="text-gray-500 mr-3">
        <i className="fas fa-arrow-left"></i>
      </button>
      <img
        src="path/to/image.jpg"
        alt="Maniratnam Anna"
        className="w-10 h-10 rounded-full"
      />
      <h4 className="ml-3 font-semibold">Maniratnam Anna 🔥</h4>
    </div>
    <div className="flex-grow p-3 overflow-y-auto">
      <ChatBubble
        message="Ekkada problem vastundi raa neeku"
        time="3:46 pm"
        isSender={false}
      />
      <ChatBubble
        message="Really sorry anna"
        time="3:34 pm"
        isSender={true}
      />
      {/* Add more ChatBubble components here */}
    </div>
    <div className="bg-white p-3 flex items-center border-t border-gray-200">
      <input
        type="text"
        placeholder="Message"
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button className="ml-2 text-blue-500">
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
);

export default ChatWindow;
