import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { UsersFeedback } from './users-feedback'

describe('UsersFeedback', () => {
  test('deve anunciar o estado de carregamento', () => {
    render(<UsersFeedback state='loading' />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading users…')
  })

  test('deve anunciar o estado vazio', () => {
    render(<UsersFeedback state='empty' />)

    expect(screen.getByRole('status')).toHaveTextContent('No users found.')
  })

  test('deve alertar o estado de erro e permitir tentar novamente', async () => {
    const onRetry = vi.fn()
    render(<UsersFeedback state='error' onRetry={onRetry} />)

    expect(screen.getByRole('alert')).toHaveTextContent('We couldn’t load the users.')
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
