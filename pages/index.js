import React, { useState } from "react";
import Link from "next/link";
import { getCategories, getProducts } from "../api/api";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Footer from "@/components/Footer";
import FilterCategory from "@/components/FilterCategory";
import { CiFilter } from "react-icons/ci";

const Home = ({ categories, products, error }) => {
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterChange = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter((category) =>
          selectedCategories.includes(category.slug)
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Home | Product Categories</title>
        <meta
          name="description"
          content="Explore our diverse range of product categories."
        />
        <meta name="keywords" content="categories, products, shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navbar categories={categories} />
      <div className="flex justify-between mt-5 items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Categories</h1>
        <button
          className="text-3xl text-gray-600 sm:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <CiFilter/>
        </button>
      </div>

      <div className="flex">
        <div className={`w-full sm:w-1/4 ${isSidebarOpen ? "block" : "hidden"} sm:block`}>
          <FilterCategory 
            categories={categories} 
            onFilterChange={handleFilterChange} 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <div className="w-full mr-14 sm:w-3/4">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : filteredCategories.length === 0 ? (
            <p className="text-gray-500 text-center">No categories found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.slug}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col ml-6 items-center group relative w-full h-60 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                >
                  <Link href={`/category/${category.slug}`}>
                    <Image
                      src={`/images/${category.slug || category.name}.jpg`}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-32 object-contain rounded-md mb-4"
                      onError={(e) => (e.target.src = "/default-thumbnail.jpg")}
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/category/${category.slug}`}>
                      <h2 className="text-2xl font-bold text-white text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {category.name}
                      </h2>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const categories = await getCategories();
    const products = await getProducts();

    return {
      props: {
        categories,
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categories: [],
        products: [],
        error: "Error fetching data. Please try again later.",
      },
    };
  }
};

export default Home;
