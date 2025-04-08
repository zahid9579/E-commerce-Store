import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>

          {/* Modal Content */}
          <div className="absolute bg-white p-6 rounded-lg z-50 w-[90%] max-w-md shadow-lg">
            <div className="flex justify-end">
              <button
                className="text-black font-semibold hover:text-gray-700 focus:outline-none"
                onClick={onClose}
              >
                X
              </button>
            </div>
            <div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
