import axios from 'axios'

const login = async (identifiants) => {
  const reponse = await axios.post('/api/login', identifiants)
  return reponse.data
}

export default { login }