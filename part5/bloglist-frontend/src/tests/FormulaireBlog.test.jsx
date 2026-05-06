import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import FormulaireBlog from '../components/FormulaireBlog'

describe('FormulaireBlog', () => {
  test('appelle onAjout avec les bonnes valeurs', async () => {
    const mockAjout = vi.fn()
    const utilisateur = userEvent.setup()

    render(<FormulaireBlog onAjout={mockAjout} />)

    const inputs = screen.getAllByRole('textbox')
    await utilisateur.type(inputs[0], 'Mon nouveau blog')
    await utilisateur.type(inputs[1], 'Kerim')
    await utilisateur.type(inputs[2], 'https://monblog.com')
    await utilisateur.click(screen.getByText('ajouter'))

    expect(mockAjout).toHaveBeenCalledWith({
      title: 'Mon nouveau blog',
      author: 'Kerim',
      url: 'https://monblog.com'
    })
  })
})