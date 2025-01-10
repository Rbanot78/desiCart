import React from "react";
import { useApp } from "../context/AppContext";
import CartItem from "../components/CartItem";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, updateCartItem, removeCartItem } = useApp();

  // Calculate total price dynamically
  const total = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateCartItem={updateCartItem}
                removeCartItem={removeCartItem}
              />
            ))}
            <div className="flex justify-end space-x-4">
              <h2 className="text-xl font-bold text-gray-900">Total:</h2>
              <p className="text-xl text-gray-700">
                ${(total || 0).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="py-3 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-lg">Your cart is currently empty.</p>
        )}

        <Link href={"/"}>
          <button className="text-center py-2 bg-gray-600 text-white rounded-md hover:bg-black transition duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
