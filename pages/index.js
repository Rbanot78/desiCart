import React, { useState } from "react";
import Link from "next/link";
import { getCategories } from "../api/api";
import { getProducts } from "../api/api";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";

const Home = ({ categories, products, error }) => {
  // Ensure that products is an array
  const productList = Array.isArray(products) ? products : products.data || [];

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
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
    
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500 text-center">No categories found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center group relative w-full h-80 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            > 
            <Link href={`/category/${category.slug}`}>
              <Image
                src={`/images/${category.slug || category.name}.jpg`}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-32 object-cover rounded-md mb-4"
                onError={(e) => (e.target.src = "/default-thumbnail.jpg")}/>
              </Link>
              {/* Hover Overlay */}
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
      <Footer/>
    </div>
  );
};

// Fetch categories and products on the server side
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
