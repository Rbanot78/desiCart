import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

export const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });

  const categoriesList = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
  ];

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions({ products: [], categories: [] });
      return;
    }

    try {
      const productsRes = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      
      const filteredCategories = categoriesList.filter(category => 
        category.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions({
        products: productsRes.data.products || [],
        categories: filteredCategories || [],
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions({ products: [], categories: [] });
    }
  };

  const debounceFetchSuggestions = useCallback(
    debounce((query) => fetchSuggestions(query), 500),
    []
  );

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, suggestions, debounceFetchSuggestions }}>
      {children}
    </SearchContext.Provider>
  );
};