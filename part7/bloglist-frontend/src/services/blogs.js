import axios from 'axios'

let jeton = null

const setJeton = (nouveauJeton) => {
  jeton = `Bearer ${nouveauJeton}`
}

const getTous = async () => {
  const reponse = await axios.get('/api/blogs')
  return reponse.data
}

const creer = async (nouveauBlog) => {
  const config = { headers: { Authorization: jeton } }
  const reponse = await axios.post('/api/blogs', nouveauBlog, config)
  return reponse.data
}

const mettreAJour = async (id, blogModifie) => {
  const reponse = await axios.put(`/api/blogs/${id}`, blogModifie)
  return reponse.data
}

const supprimer = async (id) => {
  const config = { headers: { Authorization: jeton } }
  await axios.delete(`/api/blogs/${id}`, config)
}

const getCommentaires = async (id) => {
  const reponse = await axios.get(`/api/blogs/${id}/comments`)
  return reponse.data
}

const ajouterCommentaire = async (id, comment) => {
  const config = { headers: { Authorization: jeton } }
  const reponse = await axios.post(`/api/blogs/${id}/comments`, { comment }, config)
  return reponse.data
}

export default { getTous, creer, mettreAJour, supprimer, setJeton, getCommentaires, ajouterCommentaire }