import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find(a => a.id === Number(id))

  if (!anecdote) return <div>anecdote introuvable</div>

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>a {anecdote.votes} votes</p>
      <p>pour plus d'infos : <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote