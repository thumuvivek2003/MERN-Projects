import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import { FaCheck, FaTimes } from 'react-icons/fa';

const BatchDetails = () => {
    const { batchName } = useParams();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/batch/${batchName}`).then(response => {
            setUsers(response.data);
        });
    }, [batchName]);

    const handleCheckboxChange = (user) => {
        setSelectedUsers(prevSelected => {
            if (prevSelected.includes(user.email)) {
                return prevSelected.filter(email => email !== user.email);
            } else {
                return [...prevSelected, user.email];
            }
        });
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleSendEmail = () => {
        navigate(`/send-email/${batchName}`, { state: { users: selectedUsers.map(email => ({ email })) } });
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4">{batchName} Batch</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.email)}
                                    onChange={() => handleCheckboxChange(user)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary mt-3" onClick={handleSendEmail} disabled={selectedUsers.length === 0}>
                Send Email
            </button>
        </div>
    );
};

export default BatchDetails;
