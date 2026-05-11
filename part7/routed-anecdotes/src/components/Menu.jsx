import { Link } from 'react-router-dom'

const Menu = () => (
  <nav>
    <Link to="/">anecdotes</Link> &nbsp;
    <Link to="/create">créer</Link> &nbsp;
    <Link to="/about">à propos</Link>
  </nav>
)

export default Menu