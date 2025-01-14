import { useState } from "react";
import { useApp } from "@/context/AppContext";
import toast from 'react-hot-toast';
import { useRouter } from "next/router";
import { useCompare } from "@/context/CompareContext";
import { FaRegClone, FaArrowLeft } from 'react-icons/fa'; // Added back icon

const ProductDetails = ({ product }) => {
  const { addToCart, addToWishlist, isProductInCart, isProductInWishlist } = useApp();
  const { compareItems, addToCompare } = useCompare();
  const [mainImage, setMainImage] = useState(
    product?.images[0] || "/placeholder.jpg"
  );
  const router = useRouter();

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (isProductInCart(product.id)) {
      toast.error("This product is already in your cart!");
    } else {
      addToCart(product);
      toast.success("Product added to your cart!");
    }
  };

  const handleAddToWishlist = () => {
    if (isProductInCart(product.id)) {
      toast.error("This product is already in your cart, can't add to wishlist!");
    } else if (isProductInWishlist(product.id)) {
      toast.error("This product is already in your wishlist!");
    } else {
      addToWishlist(product);
      toast.success("Product added to your wishlist!");
    }
  };

  const handleAddToCompare = () => {
    if (compareItems.length >= 3) {
      toast.error("You can only compare up to 3 products!");
    } else if (compareItems.some((item) => item.id === product.id)) {
      toast.error("This product is already in the comparison list!");
    } else if (compareItems.length > 0 && compareItems[0].category !== product.category) {
      toast.error("You can only compare products from the same category!");
    } else {
      addToCompare(product);
      toast.success("Product added to compare!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center items-center ">
          <button
            onClick={() => router.back()} // Going back to the previous page
            className="absolute mt-10 top-6 left-6 text-gray-800 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-200"
          >
            <FaArrowLeft className="w-6 h-6" />
          </button>
          <img
            src={mainImage}
            alt={product.title}
            className="max-w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
          <div className="flex justify-center mt-6 space-x-4">
            {product.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all duration-300"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <button
              className={`py-3 px-6 rounded-full shadow-lg transition duration-300 w-full ${isProductInCart(product.id) ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              onClick={handleAddToCart}
              disabled={isProductInCart(product.id)}
            >
              {isProductInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </button>
            <button
              className={`py-3 px-6 rounded-full shadow-lg transition duration-300 w-full ${isProductInWishlist(product.id) ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-pink-600 text-white hover:bg-pink-700'}`}
              onClick={handleAddToWishlist}
              disabled={isProductInWishlist(product.id)}
            >
              {isProductInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
            <button
              className={`flex items-center text-sm py-3 px-6 rounded-full transition duration-300 w-full ${compareItems.some((item) => item.id === product.id) || (compareItems.length > 0 && compareItems[0].category !== product.category) || compareItems.length >= 3 ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
              onClick={handleAddToCompare}
              disabled={compareItems.some((item) => item.id === product.id) || (compareItems.length > 0 && compareItems[0].category !== product.category) || compareItems.length >= 3}
            >
              <FaRegClone className="mr-2" />
              {compareItems.some((item) => item.id === product.id) ? 'In Compare' : 'Compare'}
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
          <p className="text-lg text-gray-700">{product.description}</p>

          <div className="flex items-center space-x-4">
            {product.discountPercentage ? (
              <>
                <p className="text-xl font-semibold text-gray-500 line-through">
                  ${product.price}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  ${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">Category</h3>
            <p className="text-gray-600">{product.category}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">Availability</h3>
            <p className="text-gray-600">{product.availabilityStatus}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">Brand</h3>
            <p className="text-gray-600">{product.brand}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">Warranty & Shipping</h3>
            <p className="text-gray-600">Warranty: {product.warrantyInformation}</p>
            <p className="text-gray-600">Shipping: {product.shippingInformation}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-lg space-y-2 hover:shadow-2xl transition-all duration-300">
                    <p className="text-gray-800 font-medium">Rating: {review.rating} / 5</p>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-gray-500 text-sm">
                      Reviewed by: {review.reviewerName} on{" "}
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              className="w-full py-3 px-6 bg-gray-200 text-gray-900 rounded-full shadow-lg hover:bg-gray-300 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
