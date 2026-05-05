const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const motDePasseHache = await bcrypt.hash('secret', 10)
  const utilisateur = new User({ username: 'admin', name: 'Admin', passwordHash: motDePasseHache })
  await utilisateur.save()
})

describe('POST /api/users', () => {
  test('un nouvel utilisateur est créé', async () => {
    const nouvelUtilisateur = { username: 'kerim', name: 'Kerim', password: 'monmotdepasse' }

    await api
      .post('/api/users')
      .send(nouvelUtilisateur)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const reponse = await api.get('/api/users')
    const noms = reponse.body.map(u => u.username)
    expect(noms).toContain('kerim')
  })

  test('400 si username déjà pris', async () => {
    const nouvelUtilisateur = { username: 'admin', name: 'Autre', password: 'motdepasse' }

    const reponse = await api
      .post('/api/users')
      .send(nouvelUtilisateur)
      .expect(400)

    expect(reponse.body.error).toContain('unique')
  })

  test('400 si username trop court', async () => {
    const nouvelUtilisateur = { username: 'ab', name: 'Test', password: 'motdepasse' }

    const reponse = await api
      .post('/api/users')
      .send(nouvelUtilisateur)
      .expect(400)

    expect(reponse.body.error).toContain('3 characters')
  })

  test('400 si mot de passe trop court', async () => {
    const nouvelUtilisateur = { username: 'validuser', name: 'Test', password: 'ab' }

    const reponse = await api
      .post('/api/users')
      .send(nouvelUtilisateur)
      .expect(400)

    expect(reponse.body.error).toContain('3 characters')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})