import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container, Form, Button, ListGroup } from 'react-bootstrap'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import FormulaireBlog from './components/FormulaireBlog'
import Menu from './components/Menu'
import ListeUtilisateurs from './components/ListeUtilisateurs'
import Utilisateur from './components/Utilisateur'
import VueBlog from './components/VueBlog'
import { afficherNotification } from './reducers/notificationReducer'
import { initialiserBlogs, creerBlog } from './reducers/blogReducer'
import { initialiserUtilisateur, login } from './reducers/utilisateurReducer'

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
    } catch (_) {
      dispatch(afficherNotification('identifiants incorrects', 5))
    }
  }

  const handleAjoutBlog = async (nouveauBlog) => {
    try {
      await dispatch(creerBlog(nouveauBlog, utilisateur))
      dispatch(
        afficherNotification(
          `nouveau blog ajouté : ${nouveauBlog.title} par ${nouveauBlog.author}`,
          5
        )
      )
    } catch (_) {
      dispatch(afficherNotification("erreur lors de l'ajout du blog", 5))
    }
  }

  if (utilisateur === null) {
    return (
      <Container>
        <h2 className="mt-3">Se connecter</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-2">
            <Form.Label>username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">se connecter</Button>
        </Form>
      </Container>
    )
  }

  return (
    <Router>
      <Menu />
      <Container>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>blogs</h2>
                <Togglable boutonLabel="créer un nouveau blog">
                  <FormulaireBlog onAjout={handleAjoutBlog} />
                </Togglable>
                <ListGroup className="mt-2">
                  {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                  ))}
                </ListGroup>
              </div>
            }
          />
          <Route path="/blogs/:id" element={<VueBlog />} />
          <Route path="/users" element={<ListeUtilisateurs />} />
          <Route path="/users/:id" element={<Utilisateur />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App