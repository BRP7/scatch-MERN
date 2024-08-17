import React from 'react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ title, price, imageUrl, handleAddToCart, handleAddToWishlist }) => {
  return (
    <div className="relative bg-black text-white border border-gold rounded-lg overflow-hidden flex flex-col h-[400px]">
      {/* Wishlist Icon */}
      <button
        onClick={handleAddToWishlist}
        className="absolute top-3 right-3 text-gray-500 hover:text-gold transition-colors"
      >
        <HeartIcon className="w-6 h-6" />
      </button>
      
      {/* Product Image */}
      <div className="w-full h-2/3 bg-gray-900 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <p className="text-gray-600 text-lg">No Image</p>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gold">${price}</p>
          <button
            onClick={handleAddToCart}
            className="lux-button flex items-center"
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
