import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const Utilisateur = () => {
  const { id } = useParams()
  const [utilisateur, setUtilisateur] = useState(null)

  useEffect(() => {
    userService.getTous().then(users => {
      const u = users.find(u => u.id === id)
      setUtilisateur(u)
    })
  }, [id])

  if (!utilisateur) return null

  return (
    <div>
      <h2>{utilisateur.name}</h2>
      <h3>blogs ajoutés</h3>
      <ul>
        {utilisateur.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Utilisateur