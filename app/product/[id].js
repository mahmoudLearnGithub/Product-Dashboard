import { useRouter } from 'next/router';

import Image from 'next/image';

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return { props: { product } };
}

export default function ProductDetail({ product }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/product/edit/${product.id}`);
  };

  const handleDelete = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.push('/');
    }
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <Image title={product.title} src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
