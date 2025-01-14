import React from "react";
import { useApp } from "../context/AppContext";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaCartPlus, FaTrashAlt } from "react-icons/fa"; // Import icons

const CompareTool = ({ product, removeFromCompare }) => {
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const handleRemoveFromCompare = () => {
    removeFromCompare(product.id);
    toast.success(`${product.title} removed from compare!`);
  };

  return (
    <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
      <Link href={`/product/${product.id}`}>
        <div className="flex justify-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-60 h-60 object-contain rounded-md  cursor-pointer transform transition duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <table className="table-auto w-full border-collapse border border-gray-200 text-sm sm:text-base">
        <thead>
          <tr>
            <th className="border border-gray-200 px-2 sm:px-4 py-2 text-left">Feature</th>
            <th className="border border-gray-200 px-2 sm:px-4 py-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Title</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">{product.title}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Description</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">{product.description}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Price</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">${product.price.toFixed(2)}</td>
          </tr>
          {product.discountPercentage && (
            <tr>
              <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Discounted Price</td>
              <td className="border border-gray-200 px-2 sm:px-4 py-2 text-red-600">
                ${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
              </td>
            </tr>
          )}
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Category</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">{product.category}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Stock Status</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">{product.availabilityStatus}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Brand</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">{product.brand}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Warranty</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">{product.warrantyInformation}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Shipping Info</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">{product.shippingInformation}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Weight</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">{product.weight}g</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-semibold">Dimensions</td>
            <td className="border border-gray-200 px-2 sm:px-4 py-2">
              {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} mm
            </td>
          </tr>
        </tbody>
      </table>

      {/* Display Reviews */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Customer Reviews:</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-2">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="text-gray-800">Rating: {review.rating} / 5</p>
                <p className="text-gray-600">"{review.comment}"</p>
                <p className="text-gray-500 text-sm">
                  Reviewed by {review.reviewerName} on{" "}
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <button
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 hover:shadow-2xl flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <FaCartPlus className="mr-2" /> Add to Cart
        </button>
        <button
          className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-200 hover:shadow-2xl flex items-center justify-center"
          onClick={handleRemoveFromCompare}
        >
          <FaTrashAlt className="mr-2" /> Remove from Compare
        </button>
        <Link href={`/category/${product.category}`}>
          <div className="w-full py-3 mt-3 px-6 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition duration-200 hover:shadow-2xl flex items-center justify-center">
            Back to {product.category}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CompareTool;
