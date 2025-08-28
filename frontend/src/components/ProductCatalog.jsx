import { useState } from 'react';

function ProductCatalog({ products }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`Added ${product.name} to cart!`);
  };

  if (products.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>No products available yet.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#007bff' }}>Our Products</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px',
        padding: '20px'
      }}>
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            backgroundColor: 'white',
            cursor: 'pointer',
            ':hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }
          }}>
            {/* Product Image */}
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ color: '#6c757d', fontSize: '14px' }}>No image</span>
              )}
            </div>

            {/* Product Info */}
            <h3 style={{ 
              margin: '10px 0', 
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              {product.name}
            </h3>
            
            <p style={{ 
              color: '#7f8c8d', 
              margin: '5px 0',
              fontSize: '14px'
            }}>
              {product.brand}
            </p>

            {/* Pricing */}
            <div style={{ margin: '15px 0' }}>
              <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#27ae60'
              }}>
                ₹{product.finalPrice}
              </span>
              
              {product.mrp > product.finalPrice && (
                <span style={{
                  fontSize: '14px',
                  color: '#95a5a6',
                  textDecoration: 'line-through',
                  marginLeft: '10px'
                }}>
                  ₹{product.mrp}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <p style={{
              color: product.stock > 0 ? '#27ae60' : '#e74c3c',
              fontSize: '14px',
              margin: '10px 0'
            }}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </p>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: product.stock > 0 ? '#3498db' : '#bdc3c7',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                if (product.stock > 0) {
                  e.target.style.backgroundColor = '#2980b9';
                }
              }}
              onMouseOut={(e) => {
                if (product.stock > 0) {
                  e.target.style.backgroundColor = '#3498db';
                }
              }}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary (optional) */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          <strong>Cart: {cart.length} items</strong>
        </div>
      )}
    </div>
  );
}

export default ProductCatalog;
