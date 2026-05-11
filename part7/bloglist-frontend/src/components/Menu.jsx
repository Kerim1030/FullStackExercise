import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/utilisateurReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const utilisateur = useSelector(state => state.utilisateur)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3 mb-3">
      <Navbar.Brand as={Link} to="/">bloglist</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">blogs</Nav.Link>
        <Nav.Link as={Link} to="/users">utilisateurs</Nav.Link>
      </Nav>
      {utilisateur && (
        <Navbar.Text className="me-2">
          {utilisateur.name} connecté
        </Navbar.Text>
      )}
      {utilisateur && (
        <Button variant="outline-light" size="sm" onClick={handleLogout}>
          se déconnecter
        </Button>
      )}
    </Navbar>
  )
}

export default Menu