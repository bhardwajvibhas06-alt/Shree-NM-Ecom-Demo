import { useState, useEffect } from 'react';

function ProductForm(props) {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    size: '',
    mrp: '',
    finalPrice: '',
    category: '',
    description: '',
    imageUrl: '',
    stock: '',
    color: ''
  });

  // Load initial data if provided (for editing)
  useEffect(() => {
    if (props.initialData && props.initialData.name) {
      setProduct(props.initialData);
    }
  }, [props.initialData]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(product);
    // Reset form only if not editing
    if (!props.initialData || !props.initialData.name) {
      setProduct({
        name: '',
        brand: '',
        size: '',
        mrp: '',
        finalPrice: '',
        category: '',
        description: '',
        imageUrl: '',
        stock: '',
        color: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '500px', margin: '20px auto' }}>
      <h2>{props.initialData && props.initialData.name ? 'Edit Product' : 'Add New Product'}</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={product.size}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          name="mrp"
          placeholder="MRP"
          value={product.mrp}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          name="finalPrice"
          placeholder="Final Price"
          value={product.finalPrice}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0', height: '60px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={product.color}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        {props.initialData && props.initialData.name ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}

export default ProductForm;
