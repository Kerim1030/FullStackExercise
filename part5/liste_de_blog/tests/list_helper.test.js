const listHelper = require('../utils/list_helper')

const blogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', likes: 5 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12 },
  { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html', likes: 10 },
  { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0 },
  { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2 },
]

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('liste vide donne 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('plusieurs blogs retourne la somme correcte', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('retourne le blog avec le plus de likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('retourne auteur avec le plus de blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('retourne auteur avec le plus de likes au total', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})