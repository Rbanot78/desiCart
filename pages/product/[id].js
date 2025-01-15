import { getProductById } from '@/api/api';
import ProductDetails from '@/components/ProductDetails';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

const ProductPage = ({ product }) => {
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <Head>
        <title>{product.name} - E-commerce</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Head>
      <Navbar />
      <ProductDetails product={product} />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const { id } = params;
    const product = await getProductById(id);

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: { product },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

export default ProductPage;
