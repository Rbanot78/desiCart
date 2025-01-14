import CategoryCard from "@/components/CategoryCard";
import { getProductsByCategory } from "@/api/api";
import Navbar from "@/components/Navbar";
import FilterSidebar from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa"; // Import the back icon
import Head from "next/head"; // Import Head from next/head

const CategoryPage = ({ products = [], category, error }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({ brands: [], priceRange: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const productsPerPage = 8;

  useEffect(() => {
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];
    setBrands(uniqueBrands);
  }, [products]);

  const handleFilterChange = (filters) => {
    setFilters(filters);
  };

  useEffect(() => {
    let filtered = products;

    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [filters, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Head>
        <title>{category.name} - E-commerce</title>
        <meta name="description" content={`Browse products in the ${category.name} category`} />
        <meta name="keywords" content={`${category.name}, e-commerce, products`} />
      </Head>
      <Navbar />
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-2xl text-gray-600"
          onClick={() => window.history.back()} // Go back to the previous page
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-center sm:text-left">
          {category.name}
        </h1>
        <button
          className="text-2xl text-gray-600 sm:hidden md:block ml-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle filters"
        >
          <CiFilter />
        </button>
      </div>

      {/* Sidebar that is always visible on larger screens */}
      <div className="flex">
        <div
          className={`w-full sm:w-1/4 mt-4 ${
            isSidebarOpen ? "block" : "hidden"
          } sm:block`}
        >
          <FilterSidebar
            brands={brands}
            onFilterChange={handleFilterChange}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen} // Pass function down as a prop
          />
        </div>

        {/* Main content */}
        <div className="w-full sm:w-3/4 mt-4">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : currentProducts.length === 0 ? (
            <p className="text-gray-500 text-center">
              No products found in this category
            </p>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {currentProducts.map((product) => (
                  <CategoryCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const categorySlug = params.category;
    const products = await getProductsByCategory(categorySlug);
    const category = { name: categorySlug };

    return {
      props: {
        products,
        category,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching category products:", error);
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

export default CategoryPage;
