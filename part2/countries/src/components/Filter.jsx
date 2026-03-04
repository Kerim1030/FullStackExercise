const Filter = ({ searchQuery, handleSearchChange }) => {
  return (
    <div>
        find countries <input value={searchQuery} onChange={handleSearchChange} />
      </div>
  )
}

export default Filter