import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../axiosInstance';
import {FaCheck,FaTimes} from 'react-icons/fa' 

const SendEmail = () => {
    const location = useLocation();
    const { users } = location.state;
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState([]);
    const [prevMessages, setPrevMessages] = useState([
        'Hello Team, please find the attached report.',
        'Reminder: Please submit your tasks by EOD.',
    ]);

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
        <div className="container my-5">
            <h2 className="mb-4">Send Email</h2>
            <div className="mb-3">
                <label className="form-label">Select a previous message:</label>
                <ul className="list-group">
                    {prevMessages.map((msg, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {msg}
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => setMessage(msg)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-3">
                <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Compose your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>
            <button className="btn btn-success" onClick={handleSend}>Send Email</button>
            {status.length > 0 && (
                <div className="mt-5">
                    <h3>Send Status</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {status.map((stat, index) => (
                                <tr key={index}>
                                    <td>{stat.email}</td>
                                    <td>
                                        {stat.status === 'Sent' ? (
                                            <FaCheck className="text-success" />
                                        ) : (
                                            <FaTimes className="text-danger" />
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
