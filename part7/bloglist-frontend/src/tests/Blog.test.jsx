import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

const blog = {
  id: '123',
  title: 'Mon blog de test',
  author: 'Kerim',
  url: 'https://monblog.com',
  likes: 7,
  user: {
    id: '456',
    username: 'kerim',
    name: 'Kerim'
  }
}

const utilisateurConnecte = {
  username: 'kerim',
  name: 'Kerim'
}

describe('Blog', () => {
  test('affiche le titre et auteur mais pas url ni likes par défaut', () => {
    render(
      <Blog
        blog={blog}
        utilisateurConnecte={utilisateurConnecte}
        onLike={vi.fn()}
        onSuppression={vi.fn()}
      />
    )

    expect(screen.getByText('Mon blog de test Kerim')).toBeDefined()
    expect(document.querySelector('.blog-details')).toBeNull()
  })

  test('affiche url et likes quand on clique sur voir', async () => {
    render(
      <Blog
        blog={blog}
        utilisateurConnecte={utilisateurConnecte}
        onLike={vi.fn()}
        onSuppression={vi.fn()}
      />
    )

    const utilisateur = userEvent.setup()
    await utilisateur.click(screen.getByText('voir'))

    expect(screen.getByText('https://monblog.com')).toBeDefined()
    expect(screen.getByText('likes 7')).toBeDefined()
  })

  test('le handler like est appelé deux fois si on clique deux fois', async () => {
    const mockLike = vi.fn()
    blogService.mettreAJour.mockResolvedValue({ ...blog, likes: blog.likes + 1 })

    render(
      <Blog
        blog={blog}
        utilisateurConnecte={utilisateurConnecte}
        onLike={mockLike}
        onSuppression={vi.fn()}
      />
    )

    const utilisateur = userEvent.setup()
    await utilisateur.click(screen.getByText('voir'))
    await utilisateur.click(screen.getByText('like'))
    await utilisateur.click(screen.getByText('like'))

    expect(mockLike).toHaveBeenCalledTimes(2)
  })
})