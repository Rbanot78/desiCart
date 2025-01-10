import CategoryCard from "@/components/CategoryCard";
import { getProductsByCategory } from "@/api/api";
import Navbar from "@/components/Navbar";
import FilterSidebar from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const CategoryPage = ({ products = [], category, error }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({ brands: [], priceRange: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const uniqueBrands = [...new Set(products.map(product => product.brand))];
    setBrands(uniqueBrands);
  }, [products]);

  const handleFilterChange = (filters) => {
    setFilters(filters);
  };

  useEffect(() => {
    let filtered = products;

    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) => filters.brands.includes(product.brand));
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    if (filters.brands.length === 0 && !filters.priceRange) {
      filtered = products;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [filters, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {category ? category.name : "Category"}
      </h1>
      <div className="flex">
        <div className="w-1/4">
          <FilterSidebar brands={brands} onFilterChange={handleFilterChange} />
        </div>
        <div className="w-3/4">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : currentProducts.length === 0 ? (
            <p className="text-gray-500 text-center">No products found in this category</p>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
      props: {
        products: [],
        category: null,
        error: "Error fetching products. Please try again later.",
      },
    };
  }
};

export default CategoryPage;
