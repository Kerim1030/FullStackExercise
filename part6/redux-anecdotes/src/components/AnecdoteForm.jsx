import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addAnecdote(content))
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