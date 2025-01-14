import React from "react";
import { FaTrash } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import Link from "next/link";
import { toast } from "react-hot-toast";

const CartDropdownContent = () => {
  const { cartItems, removeCartItem } = useApp();

  const handleRemoveItem = (itemId) => {
    removeCartItem(itemId);
    toast.success("Item removed from cart");
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
            <img
              src={item.images[0] || "/placeholder.jpg"}
              alt={item.name}
              className="w-16 h-16 object-contain rounded"
            />
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
      <div className="flex justify-between mt-4">
        <Link href="/cart">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            View Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropdownContent;