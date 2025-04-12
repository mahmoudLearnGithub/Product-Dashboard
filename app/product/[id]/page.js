'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Try fetching product from localStorage first
    const localProduct = localStorage.getItem(`product-${params.id}`);
    
    if (localProduct) {
      setProduct(JSON.parse(localProduct));
    } else {
      // If not found in localStorage, fetch from API
      const fetchProduct = async () => {
        const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        const data = await res.json();
        setProduct(data);
      };

      fetchProduct();
    }
  }, [params.id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (confirmDelete) {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          // Remove from localStorage
          localStorage.removeItem(`product-${params.id}`);
          // Redirect to the products list page
          router.push('/');
        } else {
          alert('Failed to delete product!');
        }
      } catch (error) {
        alert('Error: Unable to delete product.');
      }
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover mb-4"
          style={{ maxWidth: '250px' }}
      />
      <p className="text-gray-500">{product.description}</p>
      <p className="text-xl font-semibold mt-4">Price: ${product.price}</p>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
          onClick={() => router.push(`/product/edit/${params.id}`)}
        >
          Edit Product
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md"
          onClick={handleDelete}
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}
