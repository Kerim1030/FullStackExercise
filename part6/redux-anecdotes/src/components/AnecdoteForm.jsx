import { useDispatch } from 'react-redux'
import { creerAnecdote } from '../reducers/anecdoteReducer'
import { afficherNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(creerAnecdote(content))
    dispatch(afficherNotification(`nouvelle anecdote ajoutée : "${content}"`, 5))
  }

  return (
    <div>
      <h2>ajouter une anecdote</h2>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">ajouter</button>
      </form>
    </div>
  )
}

export default AnecdoteForm