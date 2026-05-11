import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([])

  useEffect(() => {
    userService.getTous().then(u => setUtilisateurs(u))
  }, [])

  return (
    <div>
      <h2>utilisateurs</h2>
      <table>
        <tbody>
          <tr>
            <th>nom</th>
            <th>blogs créés</th>
          </tr>
          {utilisateurs.map(u => (
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListeUtilisateurs