/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import FormulaireBlog from './components/FormulaireBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [utilisateur, setUtilisateur] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)

  useEffect(() => {
    const utilisateurConnecte = window.localStorage.getItem('utilisateurBlogapp')
    if (utilisateurConnecte) {
      const u = JSON.parse(utilisateurConnecte)
      setUtilisateur(u)
      blogService.setJeton(u.token)
    }
  }, [])

  useEffect(() => {
    if (utilisateur) {
      blogService.getTous().then(b => setBlogs(b))
    }
  }, [utilisateur])

  const afficherNotification = (texte, type) => {
    setMessage(texte)
    setTypeMessage(type)
    setTimeout(() => setMessage(null), 4000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const u = await loginService.login({ username, password })
      window.localStorage.setItem('utilisateurBlogapp', JSON.stringify(u))
      blogService.setJeton(u.token)
      setUtilisateur(u)
      setUsername('')
      setPassword('')
    } catch (_erreur) {
      afficherNotification('identifiants incorrects', 'erreur')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('utilisateurBlogapp')
    setUtilisateur(null)
    setBlogs([])
  }

  const handleAjoutBlog = async (nouveauBlog) => {
    try {
      const blogCree = await blogService.creer(nouveauBlog)
      const blogAvecUtilisateur = { ...blogCree, user: utilisateur }
      setBlogs(blogs.concat(blogAvecUtilisateur))
      afficherNotification(`nouveau blog ajouté : ${nouveauBlog.title} par ${nouveauBlog.author}`, 'succes')
    } catch (_erreur) {
      afficherNotification("erreur lors de l'ajout du blog", 'erreur')
    }
  }

  const handleLike = (blogMisAJour) => {
    setBlogs(blogs.map(b => b.id === blogMisAJour.id ? { ...blogMisAJour, user: b.user } : b))
  }

  const handleSuppression = (id) => {
    setBlogs(blogs.filter(b => b.id !== id))
  }

  const blogsTries = [...blogs].sort((a, b) => b.likes - a.likes)

  if (utilisateur === null) {
    return (
      <div>
        <h2>Se connecter</h2>
        <Notification message={message} type={typeMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username <input value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            password <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">se connecter</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={typeMessage} />
      <p>{utilisateur.name} connecté <button onClick={handleLogout}>se déconnecter</button></p>

      <Togglable boutonLabel="créer un nouveau blog">
        <FormulaireBlog onAjout={handleAjoutBlog} />
      </Togglable>

      {blogsTries.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          utilisateurConnecte={utilisateur}
          onLike={handleLike}
          onSuppression={handleSuppression}
        />
      )}
    </div>
  )
}

export default App