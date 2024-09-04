import React, { useState } from 'react';
import { FaBookBible } from "react-icons/fa6";

const ModalComponent = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className='relative'>
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        // className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/4"
      >
        <FaBookBible fontSize='55px' color='white'  className='shadow-md m-3 bg-blue-500 p-3 rounded fixed bottom-0 left-0 '/>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full m-3"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
