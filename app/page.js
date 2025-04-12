import Link from 'next/link';
import Image from 'next/image';

import './globals.css';

export const metadata = {
  title: 'AQTAR - Product Dashboard',
  description: 'Manage products with full CRUD operations using Next.js',
  keywords: 'React, Next.js, CRUD, Products, Developer, AQTAR, React/Next.js Developer Position at AQTAR',
};

export default async function Home() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>

      <Link href="/product/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">
        Add Product
      </Link>

      <p className="text-gray-500 mb-4">
        Note: This app allows you to perform CRUD operations (Create, Read, Update, Delete) on products. 
        Changes made are reflected in both the API and local storage, so you can see updates even without an internet connection.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 border rounded">
            <Image
              title={product.title}
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-48 object-cover mb-4 image-class"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
            <Link href={`/product/${product.id}`} className="text-blue-500 mt-2 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
