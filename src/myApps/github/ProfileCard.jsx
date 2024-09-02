import React from 'react';
import { FaGithub } from 'react-icons/fa';

function ProfileCard({ user }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto" />
      <h2 className="text-xl font-bold text-center mt-4">{user.login}</h2>
      <p className="text-gray-600 text-center">{user.bio}</p>
      <div className="text-center mt-4">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FaGithub className="mr-2" /> View Profile
        </a>
      </div>
    </div>
  );
}

export default ProfileCard;
