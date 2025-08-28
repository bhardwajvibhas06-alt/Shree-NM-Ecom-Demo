function ProductList({ products, onDelete, onEdit }) {
  if (products.length === 0) {
    return <p style={{ padding: '20px', textAlign: 'center' }}>No products added yet.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
            <h3>{product.name}</h3>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>MRP:</strong> ₹{product.mrp}</p>
            <p><strong>Price:</strong> ₹{product.finalPrice}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            
            <div style={{ marginTop: '15px' }}>
              <button 
                onClick={() => onEdit(product)}
                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '3px' }}
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(product.id)}
                style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
