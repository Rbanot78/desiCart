
import { getProductById } from '@/api/api';
import ProductDetails from '@/components/ProductDetails';
import Navbar from '@/components/Navbar';

const ProductPage = ({ product }) => {
  if (!product) return <div>Product not found</div>;

  return ( <div>
         <Navbar/>
        <ProductDetails product={product} />
  </div>
    
  );
  
};

export const getStaticPaths = async () => {
  // Assuming you already have product IDs or categories to generate paths
  const allProductIds = ["1", "2", "3"];  // Example product IDs, replace with real data

  const paths = allProductIds.map((id) => ({
    params: { id }
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;

  const product = await getProductById(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
    revalidate: 60,
  };
};

export default ProductPage;
