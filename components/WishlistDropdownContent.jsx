import React from "react";
import { FaTrash } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import Link from "next/link";

const WishlistDropdownContent = () => {
  const { wishlistItems, removeFromWishlist } = useApp();

  return (
    <div className="px-4 py-2">
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <img
              src={item.images[0] || "/placeholder.jpg"}
              alt={item.name}
              className="w-16 h-10 object-cover rounded"
            />
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium">{item.title}</p>
             
            </div>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      )}
      <div className="flex justify-between mt-2">
        <Link href="/wishlist">
          <button className="text-blue-600">View Wishlist</button>
        </Link>
      </div>
    </div>
  );
};

export default WishlistDropdownContent;