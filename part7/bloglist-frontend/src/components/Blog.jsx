import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, utilisateurConnecte, onLike, onSuppression }) => {
  const [detailsVisibles, setDetailsVisibles] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    onLike(blog)
  }

  const handleSuppression = () => {
    if (window.confirm(`supprimer "${blog.title}" ?`)) {
      onSuppression(blog.id)
    }
  }

  const proprietaire = blog.user
    ? blog.user.username === utilisateurConnecte.username
    : false

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-resume">
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisibles(!detailsVisibles)}>
          {detailsVisibles ? 'cacher' : 'voir'}
        </button>
      </div>
      {detailsVisibles && (
        <div className="blog-details">
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
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