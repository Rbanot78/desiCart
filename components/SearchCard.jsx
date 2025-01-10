import React, { useState } from "react";
import { FaStar, FaRegClone, FaHeart, FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { useApp } from "@/context/AppContext";
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { images, title, price, rating, discountPercentage, id, category } = product;
  const { addToCompare, compareItems } = useCompare();
  const { addToCart, addToWishlist, isProductInCart, isProductInWishlist } = useApp();

  const [mainImage, setMainImage] = useState(
    images && images.length > 0 ? images[0] : "/default-product.jpg"
  );

  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : price;

  const handleAddToCart = () => {
    if (isProductInCart(id)) {
      toast.error("This product is already in your cart!");
    } else {
      addToCart(product);
      toast.success("Product added to your cart!");
    }
  };

  const handleAddToWishlist = () => {
    if (isProductInWishlist(id)) {
      toast.error("This product is already in your wishlist!");
    } else {
      addToWishlist(product);
      toast.success("Product added to your wishlist!");
    }
  };

  const handleAddToCompare = () => {
    if (compareItems.length >= 3) {
      toast.error("You can only compare up to 3 products!");
    } else if (compareItems.some((item) => item.id === id)) {
      toast.error("This product is already in the comparison list!");
    } else if (compareItems.length > 0 && compareItems[0].category !== category) {
      toast.error("You can only compare products from the same category!");
    } else {
      addToCompare(product);
      toast.success("Product added to compare!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transform transition duration-300 hover:scale-105 hover:shadow-xl mt-10">
      <Link href={`/product/${id}`} passHref>
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 block cursor-pointer">
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-contain transition-all duration-500 ease-in-out transform group-hover:scale-110"
            onError={() => setMainImage("/default-product.jpg")}
          />
          {discountPercentage && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-md">
              {discountPercentage}% OFF
            </div>
          )}
          <div className="absolute top-2 right-2">
            <button
              onClick={(e) => { e.stopPropagation(); handleAddToWishlist(); }}
              className="bg-white p-1 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
            >
              <FaHeart className={`text-red-600 ${isProductInWishlist(id) ? 'opacity-50' : ''}`} />
            </button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <div className="flex items-center mt-2">
          {discountPercentage ? (
            <>
              <p className="text-sm sm:text-lg font-bold text-blue-500 line-through mr-2">
                ${price}
              </p>
              <p className="text-sm sm:text-lg font-bold text-red-600">
                ${discountedPrice.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-sm sm:text-lg font-bold text-blue-500">
              ${price}
            </p>
          )}
        </div>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`h-4 w-4 sm:h-5 sm:w-5 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm sm:text-base text-gray-500">{rating}</span>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={handleAddToCompare}
          disabled={compareItems.some((item) => item.id === id) || (compareItems.length > 0 && compareItems[0].category !== category) || compareItems.length >= 3}
          className={`flex items-center text-sm py-2 px-4 rounded-lg transition duration-300 ${compareItems.some((item) => item.id === id) || (compareItems.length > 0 && compareItems[0].category !== category) || compareItems.length >= 3 ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          <FaRegClone className="mr-2" />
          {compareItems.some((item) => item.id === id) ? 'In Compare' : 'Compare'}
        </button>
        <button
          onClick={handleAddToCart}
          disabled={isProductInCart(id)}
          className={`flex items-center text-sm py-2 px-4 rounded-lg transition duration-300 ${isProductInCart(id) ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          <FaCartPlus className="mr-2" />
          {isProductInCart(id) ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
