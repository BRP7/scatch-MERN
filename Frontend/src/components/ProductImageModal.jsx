import React from 'react';

const ProductImageModal = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full p-4 bg-black rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-3xl"
        >
          &times;
        </button>
        <img
          src={image}
          alt="Product"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImageModal;
