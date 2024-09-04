// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const App = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <div
        {...getRootProps()}
        className={`border-dashed border-4 p-10 text-center ${
          isDragActive ? 'border-green-500' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop a file here, or click to select one</p>
        )}
      </div>

      {file && (
        <div className="mt-5">
          <p className="text-center text-gray-700">{file.name}</p>
          <div className="w-full bg-gray-200 rounded-full mt-2">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-5">
        <button
          onClick={uploadFile}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload File
        </button>
      </div>

      {message && <p className="text-center mt-5 text-green-500">{message}</p>}
    </div>
  );
};

export default App;
