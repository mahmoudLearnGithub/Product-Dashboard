'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProduct({ params }) {
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch the product data when the page loads
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
      const data = await res.json();
      setProduct(data);
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      setImage(data.image);
    };

    fetchProduct();
  }, [params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      price,
      description,
      image,
    };

    try {
      // Update the product in the API
      const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const updatedData = await res.json();
        setMessage('Product updated successfully!');

        // Store updated data in localStorage 
        localStorage.setItem(`product-${params.id}`, JSON.stringify(updatedData));

        // Redirect to the product detail page
        router.push(`/product/${params.id}`);
      } else {
        setMessage('Failed to update product!');
      }
    } catch (error) {
      setMessage('Error: Unable to update product.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleUpdate} className="bg-white p-6 border rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            title='title input'
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            title='price input'
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            title='description input'   
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            title='image input'
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Update</button>
      </form>
    </div>
  );
}
