import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import {
  UsersResultsFooter,
  type UsersResultsFooterProps,
} from '@/features/users/components/users-results-footer/users-results-footer'

function setup(overrides: Partial<UsersResultsFooterProps> = {}) {
  const props: UsersResultsFooterProps = {
    page: 4,
    perPage: 15,
    total: 6748,
    totalPages: 450,
    getPageHref: (page) => `?page=${page}`,
    onPageChange: vi.fn(),
    onPerPageChange: vi.fn(),
    ...overrides,
  }
  render(<UsersResultsFooter {...props} />)
  return props
}

describe('UsersResultsFooter', () => {
  test('deve exibir o intervalo atual de resultados', () => {
    setup()

    expect(screen.getByRole('status')).toHaveTextContent('Showing results46-60 of 6748')
  })

  test('deve limitar o intervalo na última página', () => {
    setup({ page: 3, perPage: 15, total: 31, totalPages: 3 })

    expect(screen.getByRole('status')).toHaveTextContent('31-31 of 31')
  })

  test('deve alterar a quantidade por página', async () => {
    const props = setup()

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Results per page' }), '50')

    expect(props.onPerPageChange).toHaveBeenCalledWith(50)
  })

  test('deve alterar a página', async () => {
    const props = setup()

    await userEvent.click(screen.getByRole('link', { name: 'Next page' }))

    expect(props.onPageChange).toHaveBeenCalledWith(5)
  })
})
