import React from "react";
import { FaTrash } from "react-icons/fa";
import { useCompare } from "../context/CompareContext";
import Link from "next/link";

const CompareDropdownContent = () => {
  const { compareItems, removeFromCompare } = useCompare();

  return (
    <div className="px-4 py-2">
      {compareItems.length > 0 ? (
        compareItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <img
              src={item.images[0] || "/placeholder.jpg"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium">{item.title}</p>
            </div>
            <button
              onClick={() => removeFromCompare(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No items to compare.</p>
      )}
      <div className="flex justify-between mt-2">
        <Link href="/compare">
          <button className="text-blue-600">View Compare</button>
        </Link>
      </div>
    </div>
  );
};

export default CompareDropdownContent;