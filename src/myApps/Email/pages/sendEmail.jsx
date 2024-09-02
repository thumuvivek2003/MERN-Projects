import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../axiosInstance';


import templates from './templates'; // Import the templates

import { FaCheck, FaTimes,FaFileImport } from 'react-icons/fa';
import { IoMdSend } from "react-icons/io";
import { RiMailSendFill } from "react-icons/ri";

const SendEmail = () => {
    const location = useLocation();
    const { users } = location.state;
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState([]);
    const [prevMessages, setPrevMessages] = useState(templates); // Initialize from templates.js
    const handleSend = () => {
        axios.post('/send-email', {
            recipients: users,
            message,
        }).then(response => {
            setStatus(response.data.status);
        }).catch(error => {
            console.error('There was an error sending the email!', error);
        });
    };



    

    return (
        <div className="container mx-auto my-8 p-6 bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white">Send Email</h2>
            <div className="mb-6">
                <label className="block  font-medium mb-2 text-white">Select a previous message:</label>
                <ul className="list-none">
                    {prevMessages.map((msg, index) => (
                        <li key={index} className="bg-gray-700 text-white hover:bg-gray-600 transition-colors mb-3 p-3 rounded flex justify-between items-center">
                            <span>{msg}</span>
                            <button
                                className="text-white-600 hover:text-white-800 font-semibold bg-indigo-500 p-3 rounded"
                                onClick={() => setMessage(msg)}
                            >
                                <FaFileImport />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-6">
                <textarea
                    className="w-full border border-gray-300 rounded p-4 text-gray-800"
                    rows="5"
                    placeholder="Compose your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>
            <div className="flex flex-row-reverse">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    onClick={handleSend}
                >
                    <IoMdSend />
                </button>
            </div>

            {status.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Send Status</h3>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-4 text-left">Email</th>
                                <th className="border p-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {status.map((stat, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-4">{stat.email}</td>
                                    <td className="p-4">
                                        {stat.status === 'Sent' ? (
                                            <FaCheck className="text-green-500" />
                                        ) : (
                                            <FaTimes className="text-red-500" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SendEmail;
