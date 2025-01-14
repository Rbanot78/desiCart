import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaBars, FaRegHeart, FaBalanceScale } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import { useCompare } from "../context/CompareContext";
import Link from "next/link";
import Dropdown from "./Dropdown";
import CartDropdownContent from "./CartDropdownContent";
import WishlistDropdownContent from "./WishlistDropdownContent";
import CompareDropdownContent from "./CompareDropdownContent";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { cartItems, wishlistItems } = useApp();
  const { compareItems } = useCompare();
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isWishlistDropdownOpen, setIsWishlistDropdownOpen] = useState(false);
  const [isCompareDropdownOpen, setIsCompareDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartRef = useRef(null);
  const wishlistRef = useRef(null);
  const compareRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      cartRef.current &&
      !cartRef.current.contains(event.target) &&
      wishlistRef.current &&
      !wishlistRef.current.contains(event.target) &&
      compareRef.current &&
      !compareRef.current.contains(event.target)
    ) {
      setIsCartDropdownOpen(false);
      setIsWishlistDropdownOpen(false);
      setIsCompareDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleCartDropdown = () => setIsCartDropdownOpen(prevState => !prevState);
  const toggleWishlistDropdown = () => setIsWishlistDropdownOpen(prevState => !prevState);
  const toggleCompareDropdown = () => setIsCompareDropdownOpen(prevState => !prevState);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prevState => !prevState);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const compareCount = compareItems.length;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-900">
               <span className="mr-2"><FiShoppingCart /></span>  desiCart
              </Link>
            </div>
          </div>
          <SearchBar  className="m-4 p-4 scroll-m-7 sm"/>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex relative">
              <button
                onClick={toggleCartDropdown}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FiShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <Dropdown
                isOpen={isCartDropdownOpen}
                toggleDropdown={toggleCartDropdown}
                content={<CartDropdownContent />}
                ref={cartRef}
                title="Your Cart"
              />
            </div>

            <div className="hidden md:flex relative">
              <button
                onClick={toggleWishlistDropdown}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaRegHeart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <Dropdown
                isOpen={isWishlistDropdownOpen}
                toggleDropdown={toggleWishlistDropdown}
                content={<WishlistDropdownContent />}
                ref={wishlistRef}
                title="Your Wishlist"
              />
            </div>

            <div className="hidden md:flex relative">
              <button
                onClick={toggleCompareDropdown}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaBalanceScale className="h-6 w-6" />
                {compareCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {compareCount}
                  </span>
                )}
              </button>
              <Dropdown
                isOpen={isCompareDropdownOpen}
                toggleDropdown={toggleCompareDropdown}
                content={<CompareDropdownContent />}
                ref={compareRef}
                title="Compare"
              />
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              <div className="flex items-center">
                <FiShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/wishlist" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              <div className="flex items-center">
                <FaRegHeart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/compare" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              <div className="flex items-center">
                <FaBalanceScale className="h-6 w-6" />
                {compareCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {compareCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
