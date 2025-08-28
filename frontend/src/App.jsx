import { useState, useMemo } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ProductCatalog from './components/ProductCatalog'
import Pagination from './components/Pagination'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6) // Default to 6 items per page

  // Navigation state
  const [currentView, setCurrentView] = useState('admin'); // 'admin' or 'catalog'

  // Calculate pagination data
  const paginationData = useMemo(() => {
    const totalItems = products.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const currentProducts = products.slice(startIndex, startIndex + pageSize)
    
    return { currentProducts, totalPages, totalItems }
  }, [products, currentPage, pageSize])

  // Reset to page 1 when products change or page size changes
  useState(() => {
    setCurrentPage(1)
  }, [products, pageSize])

  // Function to add a new product
  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }])
    setShowForm(false)
  }

  // Function to delete a product
  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId)
      setProducts(updatedProducts)
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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Handle page size change
  const handlePageSizeChange = (size) => {
    setPageSize(size)
  }

    return (
    <>
      <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '2px solid #eee' }}>
          <button
            onClick={() => setCurrentView('admin')}
            style={{
              padding: '12px 24px',
              backgroundColor: currentView === 'admin' ? '#007bff' : 'transparent',
              color: currentView === 'admin' ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px 4px 0 0',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Admin Dashboard
          </button>
          <button
            onClick={() => setCurrentView('catalog')}
            style={{
              padding: '12px 24px',
              backgroundColor: currentView === 'catalog' ? '#007bff' : 'transparent',
              color: currentView === 'catalog' ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px 4px 0 0',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Product Store
          </button>
        </div>

        {currentView === 'admin' ? (
          <>
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
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
            >
              {showForm ? 'Close Form' : 'Add Product'}
            </button>

            {showForm && (
              <ProductForm 
                onSubmit={editingProduct ? updateProduct : addProduct}
                initialData={editingProduct || {}}
              />
            )}

            <div style={{ flex: 1 }}>
              <ProductList 
                products={paginationData.currentProducts} 
                onDelete={deleteProduct}
                onEdit={startEdit}
              />
            </div>

            {products.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={paginationData.totalPages}
                totalItems={paginationData.totalItems}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </>
        ) : (
          <ProductCatalog products={products} />
        )}
      </div>
    </>
  )
}

export default App 
