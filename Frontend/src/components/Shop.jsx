import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../index.css"; // Ensure this path is correct based on your project structure

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product?page=1&limit=10"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Log data for debugging
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Add to cart", product);
  };

  const handleAddToWishlist = (product) => {
    console.log("Add to wishlist", product);
  };

  return (
    <div className="bg-dark-gradient relative min-h-screen flex flex-col items-center">
      <div className="sparkle-dust"></div>
      <header className="lux-header text-center p-5 text-gold font-cinzel text-5xl z-10">
        LuxShop
      </header>
      <section className="text-center p-5 z-10">
        <h1 className="lux-header text-white font-playfair text-4xl">
          Our Collection
        </h1>
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.name}
                price={product.price}
                imageUrl={product.images && product.images[0]} // Adjust if images is an array
                handleAddToCart={() => handleAddToCart(product)}
                handleAddToWishlist={() => handleAddToWishlist(product)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
