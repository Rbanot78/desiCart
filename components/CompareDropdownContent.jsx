import React from "react";
import { FaTrash } from "react-icons/fa";
import { useCompare } from "../context/CompareContext";
import Link from "next/link";
import { toast } from "react-hot-toast";

const CompareDropdownContent = () => {
  const { compareItems, removeFromCompare } = useCompare();

  const handleRemove = (id) => {
    removeFromCompare(id);
    toast.success("Item removed from compare list");
  };

  return (
    <div className="px-6 py-4 bg-white shadow-lg rounded-lg">
      {compareItems.length > 0 ? (
        compareItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200">
            <img
              src={item.images[0] || "/placeholder.jpg"}
              alt={item.name}
              className="w-20 h-20 object-contain rounded-lg"
            />
            <div className="flex-1 ml-4">
              <p className="text-md font-semibold text-gray-700">{item.title}</p>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No items to compare.</p>
      )}
      <div className="flex justify-center mt-4">
        <Link href="/compare">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            View Compare
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompareDropdownContent;