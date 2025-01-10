import React from "react";
import { FaTrash } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import Link from "next/link";

const CartDropdownContent = () => {
  const { cartItems, removeCartItem } = useApp();

  return (
    <div className="px-4 py-2">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <img
              src={item.images[0] || "/placeholder.jpg"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <button
              onClick={() => removeCartItem(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
      <div className="flex justify-between mt-2">
        <Link href="/cart">
          <button className="text-blue-600">View Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropdownContent;