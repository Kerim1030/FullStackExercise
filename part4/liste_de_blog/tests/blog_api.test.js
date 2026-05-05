const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const Blog = require('../models/bloges')
const User = require('../models/user')

const api = supertest(app)

let jeton

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const motDePasseHache = await bcrypt.hash('motdepasse', 10)
  const utilisateur = new User({ username: 'kerim', name: 'Kerim', passwordHash: motDePasseHache })
  await utilisateur.save()

  const reponseLogin = await api
    .post('/api/login')
    .send({ username: 'kerim', password: 'motdepasse' })

  jeton = reponseLogin.body.token

  const utilisateurSauvegarde = await User.findOne({ username: 'kerim' })
  await Blog.insertMany([
    { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, user: utilisateurSauvegarde._id },
    { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', likes: 5, user: utilisateurSauvegarde._id }
  ])
})

describe('GET /api/blogs', () => {
  test('les blogs sont retournés en JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('le bon nombre de blogs est retourné', async () => {
    const reponse = await api.get('/api/blogs')
    expect(reponse.body).toHaveLength(2)
  })
})

describe('format des blogs', () => {
  test('la propriété id existe et pas _id', async () => {
    const reponse = await api.get('/api/blogs')
    const blog = reponse.body[0]
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

describe('POST /api/blogs', () => {
  test('un nouveau blog est bien ajouté', async () => {
    const nouveauBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${jeton}`)
      .send(nouveauBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const reponse = await api.get('/api/blogs')
    expect(reponse.body).toHaveLength(3)
    const titres = reponse.body.map(b => b.title)
    expect(titres).toContain('Canonical string reduction')
  })

  test('likes vaut 0 par défaut si non fourni', async () => {
    const nouveauBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
    }

    const reponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${jeton}`)
      .send(nouveauBlog)
      .expect(201)

    expect(reponse.body.likes).toBe(0)
  })

  test('400 si title manquant', async () => {
    const nouveauBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${jeton}`)
      .send(nouveauBlog)
      .expect(400)
  })

  test('400 si url manquante', async () => {
    const nouveauBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${jeton}`)
      .send(nouveauBlog)
      .expect(400)
  })

  test('401 si token manquant', async () => {
    const nouveauBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(nouveauBlog)
      .expect(401)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('un blog est supprimé et le total diminue', async () => {
    const blogsAvant = await api.get('/api/blogs')
    const blogASupprimer = blogsAvant.body[0]

    await api
      .delete(`/api/blogs/${blogASupprimer.id}`)
      .set('Authorization', `Bearer ${jeton}`)
      .expect(204)

    const blogsApres = await api.get('/api/blogs')
    expect(blogsApres.body).toHaveLength(1)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('les likes sont bien mis à jour', async () => {
    const reponse = await api.get('/api/blogs')
    const blogAModifier = reponse.body[0]

    const reponseModif = await api
      .put(`/api/blogs/${blogAModifier.id}`)
      .send({ likes: 99 })
      .expect(200)

    expect(reponseModif.body.likes).toBe(99)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})