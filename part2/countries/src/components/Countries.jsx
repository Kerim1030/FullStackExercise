import OneCountry from "./OneCountry"

const Countries = ({ countriesAregarder, handleRegarder }) => {
  if (countriesAregarder.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (countriesAregarder.length > 1 && countriesAregarder.length <= 10) {
      return (
        <ul>
          {countriesAregarder.map(country => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={()=>handleRegarder(country.name.common)}>
                show
              </button>
            </li>
          ))}
        </ul>
      )
    }
    if (countriesAregarder.length === 1) {
    return <OneCountry country={countriesAregarder[0]} />
  }

  return <p>No matches found</p>
}

export default Countries