import OneCountry from "./OneCountry"

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
      return (
        <ul>
          {countriesToShow.map(country => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )
    }
    if (countriesToShow.length === 1) {
    return <OneCountry country={countriesToShow[0]} />
  }

  return <p>No matches found</p>
}

export default Countries