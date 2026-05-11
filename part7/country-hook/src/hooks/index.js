import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(reponse => {
        setCountry({ found: true, data: reponse.data })
      })
      .catch(() => {
        setCountry({ found: false })
      })
  }, [name])

  return country
}