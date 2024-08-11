import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black fixed w-full z-10 top-0 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div>
          <Link to="/" className="text-gold text-2xl font-bold">
            LuxShop
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/shop" className="text-white hover:text-gold mx-4">
            Shop
          </Link>
          <Link to="/about" className="text-white hover:text-gold mx-4">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gold mx-4">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
