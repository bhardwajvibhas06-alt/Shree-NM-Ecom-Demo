function Pagination({ currentPage, totalPages, onPageChange, pageSize, totalItems, onPageSizeChange }) {
  const pageNumbers = [];
  const maxPagesToShow = 5;
  
  // Calculate page numbers to display
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px',
      borderTop: '1px solid #eee',
      marginTop: '20px'
    }}>
      {/* Results summary */}
      <div>
        <span style={{ color: '#666', fontSize: '14px' }}>
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} products
        </span>
      </div>

      {/* Page navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Items per page selector */}
        <select 
          value={pageSize} 
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value={6}>6 per page</option>
          <option value={12}>12 per page</option>
          <option value={24}>24 per page</option>
        </select>

        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
            color: currentPage === 1 ? '#999' : '#333',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>

        {/* Page numbers */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: currentPage === number ? '#007bff' : 'white',
              color: currentPage === number ? 'white' : '#333',
              cursor: 'pointer'
            }}
          >
            {number}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white',
            color: currentPage === totalPages ? '#999' : '#333',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
