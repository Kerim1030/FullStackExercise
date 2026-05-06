import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    [...state.anecdotes]
      .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            a voté {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>voter</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList