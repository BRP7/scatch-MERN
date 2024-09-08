import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

const Navbar = () => {
  const { isAuthenticated } = useAuth(); // Auth hook to check if the user is authenticated

  return (
    <nav className="bg-black fixed w-full z-10 top-0 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div>
          <Link to="/" className="text-gold text-2xl font-bold">
            LuxShop
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/about" className="text-white hover:text-gold mx-4">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gold mx-4">
            Contact
          </Link>
          {/* Link to Cart Page */}
          <Link to="/cart" className="text-white hover:text-gold mx-4 flex items-center">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
