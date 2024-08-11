import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-64 object-cover" src={product.image} alt={product.name} />
            <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-5">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                    <button className="text-white bg-black dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-700 px-4 py-2 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
