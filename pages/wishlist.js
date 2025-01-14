import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useApp } from "../context/AppContext";
import WishlistItem from "@/components/WishlistItem";
import SearchBar from '../components/SearchBar'; // Assuming you have a WishlistItem component

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useApp();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-8 lg:px-10">
      <Head>
        <title>Your Wishlist</title>
        <meta name="description" content="View and manage your wishlist items." />
        <meta name="keywords" content="wishlist, e-commerce, shopping" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="max-w-7xl mx-auto">
        {/* Centered Search Bar */}
        <div className="flex justify-center mb-6">
          <SearchBar />
        </div>
        
        {/* Back to Shop Button */}
        <Link href="/">
          <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 cursor-pointer">
            <span className="font-semibold">Back to Shop</span>
          </div>
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Your Wishlist</h1>

        {/* Wishlist Items Section */}
        {wishlistItems.length > 0 ? (
          <div className="space-y-6">
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                removeFromWishlist={removeFromWishlist}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">Your wishlist is currently empty.</p>
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

export default WishlistPage;
