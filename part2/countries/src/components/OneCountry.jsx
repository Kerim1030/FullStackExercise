import { useState, useEffect } from "react"
import axios from "axios"

const OneCountry = ({ country }) => {
  const [meteo, setMeteo] = useState(null)
  const capitale = country.capital ? country.capital[0] : null

  useEffect(() => {
    
    if (capitale) {
      const api_key = import.meta.env.VITE_SOME_KEY

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitale}&appid=${api_key}&units=metric`

      axios
        .get(url)
        .then(response => {
          setMeteo(response.data)
        })
        .catch(error => {
          console.log("Erreur de récupération météo :", error)
        })
    }
  }, [capitale])

      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital ? country.capital[0] : 'N/A'}</p>
          <p>area {country.area}</p>
          
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages || {}).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img 
            src={country.flags.png} 
            alt={`Flag of ${country.name.common}`} 
            width="150" 
          />

          {meteo && (
            <div>
              <h3>Weather in {capitale}</h3>
              <p>temperature {meteo.main.temp} Celcius</p>
             
              <p>wind {meteo.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )
}

export default OneCountry