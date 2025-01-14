import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const FilterCategory = ({ categories, onFilterChange, isSidebarOpen, setIsSidebarOpen }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    onFilterChange(selectedCategories);
  }, [selectedCategories, onFilterChange]);

  return (
    <div className="mb-6 ">
      <div
        className={`fixed inset-0 bg-white p-6 shadow-lg z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0 sm:w-64`}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-gray-600 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
        <div className="space-y-4">
          {categories.map((category) => (
            <label key={category.slug} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
                onChange={() => handleCategoryChange(category.slug)}
                aria-labelledby={`label-${category.slug}`}
              />
              <span id={`label-${category.slug}`} className="text-gray-700 text-sm">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)} // Fix this line
        ></div>
      )}
    </div>
  );
};

export default FilterCategory;
