import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSearch } from "../context/SearchContext";
import Image from "next/image";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, suggestions, debounceFetchSuggestions } = useSearch();
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchBarRef = useRef(null);
  const debounceTimeout = useRef(null);
  const router = useRouter();

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.length > 2) {
      debounceTimeout.current = setTimeout(() => {
        debounceFetchSuggestions(value);
        setIsSuggestionsVisible(true);
      }, 300);
    } else {
      setIsSuggestionsVisible(false);
    }
  };

  const handleSuggestionClick = (item) => {
    if (item.title) {
      router.push(`/search?q=${item.title}`);
    } else if (item.name) {
      router.push(`/search?category=${item.name}`);
    }
    setIsSuggestionsVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery.length > 2) {
      router.push(`/search?q=${searchQuery}`);
      setIsSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchQuery]);

  const products = suggestions.products || [];
  const categories = suggestions.categories || [];

  return (
    <div ref={searchBarRef} className="relative w-full max-w-lg ml-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="w-full p-3 pl-10 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          placeholder="Search for products..."
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width={20}
          height={20}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>

      {isSuggestionsVisible && (
        <ul className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
          {products.length > 0 || categories.length > 0 ? (
            <>
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {product.title}
                  </span>
                </li>
              ))}
              {categories.map((category) => (
                <li
                  key={category}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                  onClick={() => handleSuggestionClick({ name: category })}
                >
                  <span className="text-sm font-medium text-gray-700">
                    {category}
                  </span>
                </li>
              ))}
            </>
          ) : (
            <li className="p-3 text-gray-500 text-center">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
