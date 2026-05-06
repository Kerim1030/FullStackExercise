import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, utilisateurConnecte, onLike, onSuppression }) => {
  const [detailsVisibles, setDetailsVisibles] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const blogModifie = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    const blogMisAJour = await blogService.mettreAJour(blog.id, blogModifie)
    onLike(blogMisAJour)
  }

  const handleSuppression = async () => {
    if (window.confirm(`supprimer "${blog.title}" ?`)) {
      await blogService.supprimer(blog.id)
      onSuppression(blog.id)
    }
  }

  const proprietaire = blog.user
    ? (blog.user.username === utilisateurConnecte.username)
    : false

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisibles(!detailsVisibles)}>
          {detailsVisibles ? 'cacher' : 'voir'}
        </button>
      </div>
      {detailsVisibles && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : ''}</div>
          {proprietaire && (
            <button onClick={handleSuppression}>supprimer</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object
  }).isRequired,
  utilisateurConnecte: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onSuppression: PropTypes.func.isRequired
}

export default Blog