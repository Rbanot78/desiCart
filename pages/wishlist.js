import React from "react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import WishlistItem from "@/components/WishlistItem"; // Assuming you have a WishlistItem component to display each item

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Wishlist</h1>

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
          <p className="text-gray-600 text-lg">
            Your wishlist is currently empty.
          </p>
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

export default WishlistPage;
