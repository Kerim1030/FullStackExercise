import { useSelector, useDispatch } from 'react-redux'
import { voterAnecdote } from '../reducers/anecdoteReducer'
import { afficherNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    [...state.anecdotes]
      .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(voterAnecdote(anecdote))
    dispatch(afficherNotification(`vous avez voté pour "${anecdote.content}"`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            a voté {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>voter</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList