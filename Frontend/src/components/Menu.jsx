import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">LuxShop</Link>
                <ul className="flex space-x-4">
                    <li><Link to="/shop" className="text-gray-900 dark:text-white hover:text-gray-700">Shop</Link></li>
                    <li><Link to="/about" className="text-gray-900 dark:text-white hover:text-gray-700">About</Link></li>
                    <li><Link to="/contact" className="text-gray-900 dark:text-white hover:text-gray-700">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
