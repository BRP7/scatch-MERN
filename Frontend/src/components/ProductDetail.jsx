import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import ProductImageModal from './ProductImageModal';
import { useAuth } from './AuthContext'; // Ensure this is correctly imported

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth(); // Use authentication context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Error fetching product details');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: id,
        quantity: 1 // Adjust as needed
      }, {
        withCredentials: true // Ensure cookies are sent with request
      });

      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="bg-dark-gradient min-h-screen p-6 mt-10">
      <header className="lux-header text-center p-5 text-gold font-cinzel text-5xl mb-6">
        Product Details
      </header>
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Product Image Gallery */}
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto object-cover cursor-pointer"
              style={{ maxHeight: '500px' }}
              onClick={() => setShowModal(true)} 
            />
            {/* Thumbnail Images */}
            <div className="flex mt-4 space-x-2">
              {product.images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} thumbnail ${index}`}
                  className="w-20 h-20 object-cover cursor-pointer border border-gold rounded"
                  onClick={() => setShowModal(true)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-4xl font-bold mb-2 text-gold">{product.name}</h2>
            <p className="text-lg font-semibold text-gold mb-4">${product.price}</p>
            <p className="text-white mb-6">{product.description}</p>
            <div className="flex items-center mb-6">
              <button
                className="lux-button flex items-center mr-4"
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                className="text-gray-500 hover:text-gold transition-colors"
                // Implement your add to wishlist functionality
              >
                <HeartIcon className="w-6 h-6" />
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gold mb-4">Reviews:</h3>
              {product.reviews.length ? (
                product.reviews.map((review) => (
                  <div key={review._id} className="border-t border-gray-700 mt-4 pt-4">
                    <p className="text-yellow-400">Rating: {review.rating} / 5</p>
                    <p className="text-white">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-white">No reviews yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Image Modal */}
      {showModal && (
        <ProductImageModal
          image={product.images[0]}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
