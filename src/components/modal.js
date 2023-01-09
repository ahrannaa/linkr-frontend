import React, { useState } from 'react';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner';

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleAdd() {
    setIsLoading(true);
    // Add code to perform the add action here
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
    }, 3000);
  }

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <Modal isOpen={isOpen} onRequestClose={handleClose}>
        {isLoading ? (
          <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
        ) : (
          <div>
            Modal content
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleClose}>Cancel</button>
          </div>
        )}
      </Modal>
    </div>
  );
}