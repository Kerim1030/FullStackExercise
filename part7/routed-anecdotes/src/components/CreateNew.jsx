import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNew = ({ addNew, setNotification }) => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({ content, author, info, votes: 0 })
    setNotification(`une nouvelle anecdote "${content}" a été créée !`)
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  return (
    <div>
      <h2>créer une nouvelle anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          contenu
          <input value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <div>
          auteur
          <input value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          url pour plus d'infos
          <input value={info} onChange={e => setInfo(e.target.value)} />
        </div>
        <button type="submit">créer</button>
      </form>
    </div>
  )
}

export default CreateNew