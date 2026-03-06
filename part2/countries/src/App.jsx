import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [rechercher, setRechercher] = useState('')

  

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
    setRechercher(event.target.value)
  }

  const handleRegarder = (name) => {
    setRechercher(name)
  }


  const countriesAregarder = countries.filter(country =>
    country.name.common.toLowerCase().includes(rechercher.toLowerCase())
  )

  return (
    <div>
      <Filter rechercher={rechercher} handleSearchChange={handleSearchChange} />
      {rechercher && <Countries countriesAregarder={countriesAregarder} handleRegarder = {handleRegarder} />}
    </div>
  )
}

export default App