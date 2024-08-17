import React from 'react';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'; // Import icons

const ProductCard = ({ title, price, imageUrl, handleAddToCart, handleAddToWishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-xl font-bold text-gray-900">${price}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" /> Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <HeartIcon className="h-5 w-5 mr-2" /> Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
