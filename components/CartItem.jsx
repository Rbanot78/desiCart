import Link from "next/link";
import React from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const CartItem = ({ item, updateCartItem, removeCartItem, id }) => {
  const handleUpdateCartItem = (itemId, quantity) => {
    updateCartItem(itemId, quantity);
    toast.success('Item updated successfully');
  };

  const handleRemoveCartItem = (itemId) => {
    removeCartItem(itemId);
    toast.error('Item removed from cart');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative">
      {/* Product Link */}
      <Link href={`/product/${item.id}`}>
        <div className="flex items-center space-x-4 cursor-pointer hover:scale-105 transform transition-all duration-200">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-20 h-20 object-contain rounded-md shadow-sm"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold text-gray-800 truncate">
              {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
            </h2>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>

      {/* Quantity and Remove Button */}
      <div className="flex flex-row justify-center items-center space-x-4 mt-4 sm:mt-0">
        <input
          type="number"
          value={item.quantity}
          min="1"
          className="w-16 py-2 px-3 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          onChange={(e) => handleUpdateCartItem(item.id, parseInt(e.target.value))}
        />
        
        {/* Remove Button */}
        <button
          onClick={() => handleRemoveCartItem(item.id)}
          className="text-red-600 hover:text-red-800 transition duration-200 font-medium"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
