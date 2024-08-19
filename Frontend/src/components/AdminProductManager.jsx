import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/product");
        setProducts(response.data.products);
        console.log("Fetched Products:", response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-dark-gradient relative">
      <div className="absolute inset-0 sparkle-dust"></div>
      <div className="bg-black p-8 rounded-lg shadow-md border border-gold max-w-4xl w-full relative z-10 mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-gold">
          Manage Products
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gold">Name</th>
              <th className="py-2 px-4 border-b border-gold">Price</th>
              <th className="py-2 px-4 border-b border-gold">Actions</th>
            </tr>
          </thead>
          <tbody>
            // Debug to check image URLs
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-4 border-b border-gold">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gold">
                  {product.name}
                </td>
                <td className="py-2 px-4 border-b border-gold">
                  ${product.price}
                </td>
                <td className="py-2 px-4 border-b border-gold">
                  <Link
                    to={`/admin/product/edit/${product._id}`}
                    className="text-gold mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductManager;
