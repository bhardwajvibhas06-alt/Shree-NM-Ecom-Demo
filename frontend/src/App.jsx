import { useState } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  // Function to add a new product
  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }])
    setShowForm(false)
  }

  // Function to delete a product
  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId))
    }
  }

  // Function to start editing a product
  const startEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  // Function to update an existing product
  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === editingProduct.id ? { ...updatedProduct, id: editingProduct.id } : product
    ))
    setEditingProduct(null)
    setShowForm(false)
  }

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h1>Product Management Dashboard</h1>
        
        <button 
          onClick={() => {
            setEditingProduct(null)
            setShowForm(!showForm)
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginBottom: '20px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Close Form' : 'Add Product'}
        </button>

        {/* Show the form only when showForm is true */}
        {showForm && (
          <ProductForm 
            onSubmit={editingProduct ? updateProduct : addProduct}
            initialData={editingProduct || {}}
          />
        )}

        {/* Show the product list */}
        <ProductList 
          products={products} 
          onDelete={deleteProduct}
          onEdit={startEdit}
        />
      </div>
    </>
  )
}

export default App
