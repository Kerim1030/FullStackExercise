import { useState } from 'react'

const FormulaireBlog = ({ onAjout }) => {
  const [titre, setTitre] = useState('')
  const [auteur, setAuteur] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAjout({ title: titre, author: auteur, url })
    setTitre('')
    setAuteur('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>titre <input value={titre} onChange={e => setTitre(e.target.value)} /></div>
      <div>auteur <input value={auteur} onChange={e => setAuteur(e.target.value)} /></div>
      <div>url <input value={url} onChange={e => setUrl(e.target.value)} /></div>
      <button type="submit">ajouter</button>
    </form>
  )
}

export default FormulaireBlog