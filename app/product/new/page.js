"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price,
      description,
      image,
    };

    try {
      // إرسال البيانات إلى API
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();

      // تخزين البيانات في Local Storage
      let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      storedProducts.push(data);
      localStorage.setItem('products', JSON.stringify(storedProducts));

      // إعادة التوجيه إلى الصفحة الرئيسية
      router.push('/');
      
      // عرض رسالة توعية للمستخدم
      alert('Product successfully added and saved locally!');
    } catch (error) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title</label>
          <input
            title='product text input'
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block">Price</label>
          <input
            title='price input'
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            title='product description input'
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block">Image URL</label>
          <input
            title='product image input'
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  );
}
