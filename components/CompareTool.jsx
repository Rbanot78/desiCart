import React from "react";
import { useApp } from "../context/AppContext";
import Link from "next/link";

const CompareTool = ({ product, removeFromCompare }) => {
  const { addToCart } = useApp();

  return (
    <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
      <Link href={`/product/${product.id}`}>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg mb-4"/>
       
       </Link>
      
      <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
      <p className="text-lg text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-bold text-gray-900 mt-2">Price: ${product.price}</p>
      {product.discountPercentage && (
        <p className="text-lg text-red-600 mt-2">
          Discounted Price: $
          {(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
        </p>
      )}
      <p className="text-md text-gray-700 mt-2">Category: {product.category}</p>
      <p className="text-md text-gray-700 mt-2">Stock Status: {product.availabilityStatus}</p>
      <p className="text-md text-gray-700 mt-2">Brand: {product.brand}</p>
      <p className="text-md text-gray-700 mt-2">Warranty: {product.warrantyInformation}</p>
      <p className="text-md text-gray-700 mt-2">Shipping Info: {product.shippingInformation}</p>

      {/* Display Reviews */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-800">Customer Reviews:</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-2">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
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

      <div className="mt-4 space-y-2">
        <button
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        <button
          className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-200"
          onClick={() => removeFromCompare(product.id)} >
          Remove from Compare
        </button>
      </div>

    </div>
  );
};

export default CompareTool;