/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [utilisateur, setUtilisateur] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [titre, setTitre] = useState('')
  const [auteur, setAuteur] = useState('')
  const [url, setUrl] = useState('')
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
    } catch (erreur) {
      afficherNotification('identifiants incorrects', 'erreur')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('utilisateurBlogapp')
    setUtilisateur(null)
    setBlogs([])
  }

  const handleAjoutBlog = async (e) => {
    e.preventDefault()
    try {
      const nouveauBlog = await blogService.creer({ title: titre, author: auteur, url })
      setBlogs(blogs.concat(nouveauBlog))
      afficherNotification(`nouveau blog ajouté : ${titre} par ${auteur}`, 'succes')
      setTitre('')
      setAuteur('')
      setUrl('')
    } catch (erreur) {
      afficherNotification("erreur lors de l'ajout du blog", 'erreur')
    }
  }

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

      <h3>ajouter un nouveau blog</h3>
      <form onSubmit={handleAjoutBlog}>
        <div>titre <input value={titre} onChange={e => setTitre(e.target.value)} /></div>
        <div>auteur <input value={auteur} onChange={e => setAuteur(e.target.value)} /></div>
        <div>url <input value={url} onChange={e => setUrl(e.target.value)} /></div>
        <button type="submit">ajouter</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App