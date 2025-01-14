import React from "react";
import { useApp } from "../context/AppContext";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon
import Head from "next/head"; // Import Head from next/head
import SearchBar from "../components/SearchBar";

const CartPage = () => {
  const { cartItems, updateCartItem, removeCartItem } = useApp();

  // Calculate total price dynamically
  const total = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12  px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Your Shopping Cart</title>
        <meta name="description" content="View and manage items in your shopping cart." />
        <meta name="keywords" content="shopping cart, e-commerce, online store" />
        <meta name="author" content="Your Name" />
      </Head>

      <div className="flex justify-center m-4 p-4">
        <SearchBar className="scroll-m-7 sm" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/">
          <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 cursor-pointer">
            <FaArrowLeft className="text-xl" />
            <span className="font-semibold">Back to Shop</span>
          </div>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">Your Shopping Cart</h1>
       
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
            
            {/* Total Price */}
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Total:</h2>
              <p className="text-xl sm:text-2xl font-bold text-gray-700">${(total || 0).toFixed(2)}</p>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-end mt-6">
              <button className="py-3 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-lg">Your cart is currently empty.</p>
        )}

        {/* Continue Shopping Button */}
        <div className="mt-8 flex justify-center">
          <Link href={"/"}>
            <button className="py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-black transition duration-300 transform hover:scale-105">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
