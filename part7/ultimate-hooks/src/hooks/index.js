import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return { type, value, onChange, reset }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(reponse => {
      setResources(reponse.data)
    })
  }, [baseUrl])

  const create = async (nouvelObjet) => {
    const reponse = await axios.post(baseUrl, nouvelObjet)
    setResources(resources.concat(reponse.data))
  }

  const service = { create }

  return [resources, service]
}