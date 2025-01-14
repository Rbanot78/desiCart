import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProductCard from '../components/SearchCard'; // Import ProductCard component
import Footer from '../components/Footer';

const SearchPage = () => {
  const router = useRouter();
  const { q, category } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      if (q) {
        const res = await axios.get(`https://dummyjson.com/products/search?q=${q}`);
        setResults(res.data.products);
      } else if (category) {
        const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
        setResults(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Error fetching search results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (q || category) {
      fetchResults();
    }
  }, [q, category]);

  const pageTitle = q ? `Search results for "${q}"` : category ? `Category: ${category}` : 'Search Results';
  const pageDescription = q ? `Search results for products related to "${q}"` : category ? `Products in the category "${category}"` : 'Search results for products and categories';

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">{pageTitle}</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} /> // Use ProductCard component
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>

      <Footer/>
    </div>
  );
};

export default SearchPage;