import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';

const BatchDetails = () => {
    const [error,setError] = useState(False);
    const { batchName } = useParams();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/batch/${batchName}`).then(response => {
            setUsers(response.data);
        }).catch(()=>{setError(False)});
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
        <div className="max-w-4xl mx-auto my-8 bg-gray-800 rounded-lg p-6 shadow-lg">
            {error} && <h1>Eroor</h1>
            <h2 className="text-2xl font-bold text-white mb-6">{batchName.charAt(0).toUpperCase() + batchName.slice(1)}</h2>
            <div className="relative mb-4">
                <input
                    type="text"
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table className="min-w-full bg-gray-700 text-white rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="py-3 px-4 text-left">Select</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-600 transition-colors">
                            <td className="py-3 px-4">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    checked={selectedUsers.includes(user.email)}
                                    onChange={() => handleCheckboxChange(user)}
                                />
                            </td>
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400"
                onClick={handleSendEmail}
                disabled={selectedUsers.length === 0}
            >
                Send Email
            </button>
        </div>
    );
};

export default BatchDetails;
