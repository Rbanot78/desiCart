import Link from "next/link";
import React from "react";

const CartItem = ({ item, updateCartItem, removeCartItem, id }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      <Link href={`/product/${item.id}`}>
        <div className="flex items-center">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
          </div>
        </div>
        </Link>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={item.quantity}
            min="1"
            className="w-16 py-2 px-3 border rounded-md text-center"
            onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
          />
          <button
            onClick={() => removeCartItem(item.id)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
   
    </div>
  );
};

export default CartItem;
