import React from 'react';
import { useApp } from '../context/AppContext';
import Link from 'next/link';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const WishlistItem = ({ item }) => {
  const { addToCart, removeFromWishlist } = useApp();

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    toast.success(`${item.title} added to cart`);
  };

  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
    toast.error('Item removed from wishlist');
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
      {/* Product Link */}
      
      <Link href={`/product/${item.id}`} passHref>
        <div className="flex items-center w-full cursor-pointer mb-4 md:mb-0">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-20 h-20 object-contain rounded-md shadow-sm"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800 hover:text-gray-900">{item.title}</h2>
            <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
  
      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(item)}
          className="flex items-center text-white bg-blue-600 px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 hover:shadow-lg"
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>

        {/* Remove from Wishlist Button */}
        <button
          onClick={() => handleRemoveFromWishlist(item.id)}
          className="flex items-center text-red-600 bg-transparent border-2 border-red-600 px-5 py-2 rounded-lg transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg"
        >
          <FaTrashAlt className="mr-2" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
