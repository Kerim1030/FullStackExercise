import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/utilisateurReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const utilisateur = useSelector(state => state.utilisateur)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Link to="/">blogs</Link> &nbsp;
      <Link to="/users">utilisateurs</Link> &nbsp;
      {utilisateur && (
        <span>
          {utilisateur.name} connecté
          <button onClick={handleLogout}>se déconnecter</button>
        </span>
      )}
    </div>
  )
}

export default Menu