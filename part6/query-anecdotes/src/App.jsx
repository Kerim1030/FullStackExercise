import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTous, creer, mettreAJour } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const resultat = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getTous,
    retry: 1
  })

  const nouvelleMutation = useMutation({
    mutationFn: creer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const voteMutation = useMutation({
    mutationFn: mettreAJour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  if (resultat.isLoading) {
    return <div>chargement...</div>
  }

  if (resultat.isError) {
    return <div>le service des anecdotes n'est pas disponible en raison de problèmes avec le serveur</div>
  }

  const anecdotes = resultat.data

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    nouvelleMutation.mutate(content)
  }

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            a voté {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>voter</button>
          </div>
        </div>
      ))}
      <h2>ajouter une anecdote</h2>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">ajouter</button>
      </form>
    </div>
  )
}

export default App