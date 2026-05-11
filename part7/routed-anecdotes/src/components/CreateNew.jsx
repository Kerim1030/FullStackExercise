import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew, setNotification }) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const { reset: resetContent, ...contentProps } = content
  const { reset: resetAuthor, ...authorProps } = author
  const { reset: resetInfo, ...infoProps } = info

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification(`une nouvelle anecdote "${content.value}" a été créée !`)
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>créer une nouvelle anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          contenu
          <input {...contentProps} />
        </div>
        <div>
          auteur
          <input {...authorProps} />
        </div>
        <div>
          url pour plus d'infos
          <input {...infoProps} />
        </div>
        <button type="submit">créer</button>
        <button type="button" onClick={handleReset}>réinitialiser</button>
      </form>
    </div>
  )
}

export default CreateNew