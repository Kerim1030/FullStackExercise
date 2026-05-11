import axios from 'axios'

const baseUrl = '/api/users'

const getTous = async () => {
  const reponse = await axios.get(baseUrl)
  return reponse.data
}

export default { getTous }