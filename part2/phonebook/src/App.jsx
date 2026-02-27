import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')
  
  const showAll = showFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(showFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
    })

  }

  const supprimerPerson = (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) {
      return
    }
    personService
      .supprimer(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons showAll={showAll} handleDelete={supprimerPerson} />
    </div>
  )
}

export default App