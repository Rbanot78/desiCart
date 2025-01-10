import { createContext, useContext, useEffect, useState } from "react";

const CompareContext = createContext(undefined);

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    // Load initial state from localStorage
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("compareItems");
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  });

  // Save compare items to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("compareItems", JSON.stringify(compareItems));
    }
  }, [compareItems]);

  const addToCompare = (product) => {
    setCompareItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        return prevItems; // Product already in compare list
      } else {
        return [...prevItems, product]; // Add new product to compare
      }
    });
  };

  const removeFromCompare = (productId) => {
    setCompareItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};