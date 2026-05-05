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

export default { getTous, creer, setJeton }