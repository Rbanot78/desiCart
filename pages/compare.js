import React from "react";
import Head from "next/head";
import { useCompare } from "../context/CompareContext";
import CompareTool from "../components/CompareTool";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ComparePage = () => {
  const { compareItems, removeFromCompare } = useCompare();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Compare Products</title>
        <meta name="description" content="Compare your favorite products side by side." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Compare Products</h1>
      {compareItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compareItems.map((product) => (
            <CompareTool
              key={product.id}
              product={product}
              removeFromCompare={removeFromCompare}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products to compare.</p>
      )}

      <Footer/>
    </div>
  );
};

export default ComparePage;