import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getTous = async () => {
  const reponse = await axios.get(baseUrl)
  return reponse.data
}

export const creer = async (content) => {
  const reponse = await axios.post(baseUrl, { content, votes: 0 })
  return reponse.data
}

export const mettreAJour = async (anecdote) => {
  const reponse = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return reponse.data
}