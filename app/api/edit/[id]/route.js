// app/api/edit/[id]/route.js

export async function POST(request, { params }) {
    const id = params.id;
    const formData = await request.formData();
  
    const updatedProduct = {
      title: formData.get('title'),
      price: formData.get('price'),
      image: formData.get('image'),
      description: formData.get('description'),
    };
  
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    return Response.redirect(`http://localhost:3000/product/${id}`, 302);
  }
  