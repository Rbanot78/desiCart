import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Close icon

const FilterSidebar = ({ brands, onFilterChange, isSidebarOpen, setIsSidebarOpen }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = () => {
    const priceRange = (minPrice || maxPrice) ? `${minPrice}-${maxPrice}` : '';
    onFilterChange({ brands: selectedBrands, priceRange });
    // Close the sidebar after applying the filter
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const priceRange = (minPrice || maxPrice) ? `${minPrice}-${maxPrice}` : '';
    onFilterChange({ brands: selectedBrands, priceRange });
  }, [selectedBrands, minPrice, maxPrice]);

  return (
    <div className="mb-6 mr-3">
      {/* Sidebar */}
      <div
        className={`bg-white p-6 rounded-lg shadow-xl w-64 space-y-6 sm:block sm:w-1/4 sm:flex fixed top-0 left-0 bottom-0 z-50 sm:relative sm:h-full sm:translate-x-0 ${
          isSidebarOpen ? 'block' : 'hidden'
        } transition-all duration-300 sm:w-64 sm:flex sm:flex-col`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-600 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h2>

        {/* Brand Filter */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Brand</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  onChange={() => handleBrandChange(brand)}
                  className="form-checkbox h-5 w-5 text-blue-500 mr-3 transition-all duration-200 focus:ring-blue-500"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Price</h3>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-1/2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-1/2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handlePriceChange}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Optional overlay for mobile when the sidebar is open */}
      {isSidebarOpen && (
        <div
          className="sm:hidden fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default FilterSidebar;