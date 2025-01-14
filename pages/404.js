import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

const Custom404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 p-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 animate-bounce mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Oops! The page you're looking for isn't here.</p>
        <p className="text-lg text-gray-600 mb-10">
          It looks like nothing was found at this location. Maybe try a search or return to the homepage.
        </p>
      </div>
      <Link href="/">
        <div className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
          <FaHome className="mr-2" />
          Go to Homepage
        </div>
      </Link>
      <div className="mt-10">
        <p className="text-sm text-gray-500">Need help? <a href="/contact" className="text-blue-500 hover:underline">Contact us</a></p>
      </div>
    </div>
  );
};

export default Custom404;
