const OneCountry = ({ country }) => {
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
        </div>
      )
}

export default OneCountry