// /src/api/index.js
import axios from 'axios';

const API_BASE_URL = "https://dummyjson.com";

// Example: Get category list
export const getCategoryList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/category-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category list:", error);
    return null;
  }
};

// Example: Get list of products by category
// /src/api/api.js

export const getProductsByCategory = async (categorySlug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/category/${categorySlug}`);
    console.log(response.data); // Log the response data to inspect its structure
    return response.data.products || [];  // Assuming products are inside a "products" field
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return [];  // Return an empty array in case of an error
  }
};


// Example: Get product categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

// Example: Get list of products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

// Example: Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

// Example: Get single product by slug
export const getProductBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
};

// Example: Get all product slugs
export const getAllProductSlugs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/slugs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }
};

// Example: Get list of users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

// Example: Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
};

// Example: Post a new product (you can add data as per your needs)
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// Example: Update product
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    return null;
  }
};

// Example: Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    return null;
  }
};

