import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likerBlog, effacerBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const VueBlog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const utilisateur = useSelector(state => state.utilisateur)

  if (!blog) return null

  const handleLike = () => {
    dispatch(likerBlog(blog))
  }

  const handleSuppression = () => {
    if (window.confirm(`supprimer "${blog.title}" ?`)) {
      dispatch(effacerBlog(blog.id))
      navigate('/')
    }
  }

  const proprietaire = blog.user
    ? blog.user.username === utilisateur.username
    : false

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
      <p>ajouté par {blog.author}</p>
      {proprietaire && (
        <button onClick={handleSuppression}>supprimer</button>
      )}
    </div>
  )
}

export default VueBlog