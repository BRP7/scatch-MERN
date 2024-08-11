import React from 'react';

const ProductCard = ({ title, price, imageUrl }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-800 via-black to-black rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden w-full h-80 md:w-64 md:h-96 lg:w-80 lg:h-120">
      <div className="absolute inset-0 sparkle-dust"></div>
      <div className="relative w-full h-full">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 rounded-t-lg"></div>
        <div className="absolute bottom-4 left-4 text-xl font-semibold text-white z-10">{title}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 rounded-b-lg flex flex-col justify-end">
        <p className="text-xl text-gold font-semibold mb-2">{price}</p>
        <button className="lux-button mt-2 w-full">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
