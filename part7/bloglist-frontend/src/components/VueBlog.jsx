import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likerBlog, effacerBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const VueBlog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const utilisateur = useSelector((state) => state.utilisateur)
  const [commentaires, setCommentaires] = useState([])
  const [nouveauCommentaire, setNouveauCommentaire] = useState('')

  useEffect(() => {
    if (blog) {
      blogService.getCommentaires(id).then((c) => setCommentaires(c))
    }
  }, [id, blog])

  if (!blog) return null

  const handleLike = () => {
    dispatch(
      likerBlog({
        ...blog,
        user: blog.user._id || blog.user.id || blog.user,
      })
    )
  }

  const handleSuppression = () => {
    if (window.confirm(`supprimer "${blog.title}" ?`)) {
      dispatch(effacerBlog(blog.id))
      navigate('/')
    }
  }

  const handleCommentaire = async (e) => {
    e.preventDefault()
    const blogMisAJour = await blogService.ajouterCommentaire(
      id,
      nouveauCommentaire
    )
    setCommentaires(blogMisAJour.comments)
    setNouveauCommentaire('')
  }

  const proprietaire = blog.user
    ? blog.user.username === utilisateur.username
    : false

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </p>
      <p>ajouté par {blog.author}</p>
      {proprietaire && <button onClick={handleSuppression}>supprimer</button>}
      <h3>commentaires</h3>
      <form onSubmit={handleCommentaire}>
        <input
          value={nouveauCommentaire}
          onChange={(e) => setNouveauCommentaire(e.target.value)}
          placeholder="ajouter un commentaire"
        />
        <button type="submit">ajouter</button>
      </form>
      <ul>
        {commentaires.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default VueBlog
