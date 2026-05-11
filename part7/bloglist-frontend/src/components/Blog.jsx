import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
  return (
    <ListGroup.Item className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> — {blog.author}
    </ListGroup.Item>
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
  }).isRequired
}

export default Blog