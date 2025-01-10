import React from 'react';
import { useApp } from '../context/AppContext';
import Link from 'next/link';
import { FaShoppingCart, FaEdit, FaTrashAlt } from 'react-icons/fa';

const WishlistItem = ({ item }) => {
  const { addToCart, removeFromWishlist} = useApp();

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
      <Link href={`/product/${item.id}`}>
        <div className="flex items-center w-full">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        {/* Add to Cart Button with Icon */}
        <button
          onClick={() => handleAddToCart(item)}
          className="flex items-center text-white bg-blue-600 px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-700"
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button> 

        {/* Remove from Wishlist Button with Icon */}
        <button
          onClick={() => removeFromWishlist(item.id)}
          className="flex items-center text-red-600 bg-transparent border-2 border-red-600 px-4 py-2 rounded-lg transition duration-200 hover:bg-red-600 hover:text-white"
        >
          <FaTrashAlt className="mr-2" />
          Remove
        </button>
      </div>

  
    </div>
  );
};

export default WishlistItem;
