import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { UsersFilters } from './users-filters'

describe('UsersFilters', () => {
  test('deve enviar o nome sem espaços nas pontas e o status selecionado', async () => {
    const onSubmit = vi.fn()
    render(<UsersFilters name='' status={undefined} onSubmit={onSubmit} />)

    await userEvent.type(screen.getByRole('searchbox', { name: 'Name' }), '  rick ')
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Status' }), 'dead')
    await userEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(onSubmit).toHaveBeenCalledWith({ name: 'rick', status: 'dead' })
  })

  test('deve enviar status indefinido quando todos os status estiverem selecionados', async () => {
    const onSubmit = vi.fn()
    render(<UsersFilters name='morty' status='alive' onSubmit={onSubmit} />)

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Status' }), '')
    await userEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(onSubmit).toHaveBeenCalledWith({ name: 'morty', status: undefined })
  })

  test('deve refletir os filtros atuais', () => {
    render(<UsersFilters name='summer' status='unknown' onSubmit={vi.fn()} />)

    expect(screen.getByRole('searchbox', { name: 'Name' })).toHaveValue('summer')
    expect(screen.getByRole('combobox', { name: 'Status' })).toHaveValue('unknown')
  })

  test('deve envolver o formulário em um landmark de busca rotulado', () => {
    const { container } = render(<UsersFilters name='' status={undefined} onSubmit={vi.fn()} />)

    const landmark = container.querySelector('search')
    expect(landmark).toHaveAccessibleName('Filter users')
    expect(landmark).toContainElement(screen.getByRole('button', { name: 'Search' }))
  })
})
