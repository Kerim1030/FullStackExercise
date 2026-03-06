const Filter = ({ rechercher, handleSearchChange }) => {
  return (
    <div>
        find countries <input value={rechercher} onChange={handleSearchChange} />
      </div>
  )
}

export default Filter