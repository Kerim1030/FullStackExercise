import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import FormulaireBlog from './components/FormulaireBlog'
import { afficherNotification } from './reducers/notificationReducer'
import { initialiserBlogs, creerBlog, likerBlog, effacerBlog } from './reducers/blogReducer'
import { initialiserUtilisateur, login, logout } from './reducers/utilisateurReducer'

const selectBlogsTries = createSelector(
  state => state.blogs,
  blogs => [...blogs].sort((a, b) => b.likes - a.likes)
)

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(selectBlogsTries)
  const utilisateur = useSelector(state => state.utilisateur)

  useEffect(() => {
    dispatch(initialiserUtilisateur())
  }, [])

  useEffect(() => {
    if (utilisateur) {
      dispatch(initialiserBlogs())
    }
  }, [utilisateur])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
    } catch (_erreur) {
      dispatch(afficherNotification('identifiants incorrects', 5))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleAjoutBlog = async (nouveauBlog) => {
    try {
      await dispatch(creerBlog(nouveauBlog, utilisateur))
      dispatch(afficherNotification(
        `nouveau blog ajouté : ${nouveauBlog.title} par ${nouveauBlog.author}`,
        5
      ))
    } catch (_erreur) {
      dispatch(afficherNotification("erreur lors de l'ajout du blog", 5))
    }
  }

  const handleLike = async (blog) => {
    await dispatch(likerBlog(blog))
  }

  const handleSuppression = async (id) => {
    await dispatch(effacerBlog(id))
  }

  if (utilisateur === null) {
    return (
      <div>
        <h2>Se connecter</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">se connecter</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {utilisateur.name} connecté{' '}
        <button onClick={handleLogout}>se déconnecter</button>
      </p>

      <Togglable boutonLabel="créer un nouveau blog">
        <FormulaireBlog onAjout={handleAjoutBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          utilisateurConnecte={utilisateur}
          onLike={handleLike}
          onSuppression={handleSuppression}
        />
      ))}
    </div>
  )
}

export default App