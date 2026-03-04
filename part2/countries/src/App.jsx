import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log("Erreur lors de la récupération des pays", error)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }


  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      {searchQuery && <Countries countriesToShow={countriesToShow} />}
    </div>
  )
}

export default App