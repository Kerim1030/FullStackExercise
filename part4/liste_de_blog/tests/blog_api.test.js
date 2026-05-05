const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloges')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs', () => {
  test('les blogs sont retournés en JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('le bon nombre de blogs est retourné', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('format des blogs', () => {
  test('la propriété id existe et pas _id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

describe('POST /api/blogs', () => {
  test('un nouveau blog est bien ajouté', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    const titles = response.body.map(b => b.title)
    expect(titles).toContain('Canonical string reduction')
  })

  test('likes vaut 0 par défaut si non fourni', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('400 si title manquant', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com',
      likes: 3
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('400 si url manquante', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('un blog est supprimé et le total diminue', async () => {
    const blogsAvant = await api.get('/api/blogs')
    const blogASupprimer = blogsAvant.body[0]

    await api
      .delete(`/api/blogs/${blogASupprimer.id}`)
      .expect(204)

    const blogsApres = await api.get('/api/blogs')
    expect(blogsApres.body).toHaveLength(initialBlogs.length - 1)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('les likes sont bien mis à jour', async () => {
    const blogs = await api.get('/api/blogs')
    const blogAModifier = blogs.body[0]

    const response = await api
      .put(`/api/blogs/${blogAModifier.id}`)
      .send({ likes: 99 })
      .expect(200)

    expect(response.body.likes).toBe(99)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})