import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCategories, getProducts } from "../api/api"; // Assuming you have an API function for products

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  // Cart and wishlist state
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // New priceSortOrder state (ascending or descending)
  const [priceSortOrder, setPriceSortOrder] = useState("asc");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // State for all products

  // Fetch categories and products
  useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      try {
        const categoryData = await getCategories(); // API call for categories
        console.log("Categories loaded:", categoryData);

        const productData = await getProducts(); // API call for products
        console.log("Products loaded:", productData);
        setAllProducts(productData); // Set all products to state
      } catch (error) {
        console.error("Error loading categories or products:", error);
      }
    };

    loadCategoriesAndProducts();

    // Load cart and wishlist data from localStorage
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
    setWishlistItems(JSON.parse(localStorage.getItem("wishlistItems")) || []);
  }, []);

  // Update localStorage whenever cart or wishlist changes
  useEffect(() => {
    console.log("Cart items updated:", cartItems);
    console.log("Wishlist items updated:", wishlistItems);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [cartItems, wishlistItems]);

  // Search functionality (filter products based on query)
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    console.log("Search query changed to:", query);

    if (allProducts.length > 0) {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Filtered products based on query:", filtered);
      setFilteredProducts(filtered);
    } else {
      console.log("No products to filter yet.");
    }
  }, [allProducts]);

  // Cart functions
  const addToCart = useCallback((product) => {
    console.log("Adding product to cart:", product);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }

      console.log("Updated cart items:", updatedItems);
      return updatedItems;
    });
  }, []);

  const updateCartItem = useCallback((productId, quantity) => {
    console.log("Updating cart item:", productId, "to quantity:", quantity);
    if (quantity <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeCartItem = useCallback((productId) => {
    console.log("Removing cart item:", productId);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  // Wishlist functions
  const addToWishlist = useCallback((product) => {
    console.log("Adding product to wishlist:", product);
    setWishlistItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        console.log("Product already in wishlist:", product);
        return prevItems; // Already in wishlist, no need to add
      } else {
        console.log("Adding new product to wishlist:", product);
        return [...prevItems, product];
      }
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    console.log("Removing product from wishlist:", productId);
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const isProductInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeCartItem,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isProductInWishlist,
        isProductInCart,
        priceSortOrder,
        setPriceSortOrder,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        handleSearchChange, // Provide the search handler function
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
