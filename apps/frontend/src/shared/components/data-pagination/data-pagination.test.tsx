import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { DataPagination } from '@/shared/components/data-pagination/data-pagination'

const getPageHref = (page: number) => `?page=${page}`

describe('DataPagination', () => {
  test('deve marcar a página atual e desabilitar a navegação para trás na primeira página', () => {
    render(
      <DataPagination page={1} totalPages={20} getPageHref={getPageHref} onPageChange={vi.fn()} />,
    )

    expect(screen.getByRole('link', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('First')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByText('First')).not.toHaveAttribute('href')
    expect(screen.getByLabelText('Previous page')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getAllByRole('link', { name: /^Page / })).toHaveLength(8)
  })

  test('deve desabilitar a navegação para frente na última página', () => {
    render(
      <DataPagination page={20} totalPages={20} getPageHref={getPageHref} onPageChange={vi.fn()} />,
    )

    expect(screen.getByLabelText('Next page')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByLabelText('Last page')).toHaveAttribute('aria-disabled', 'true')
  })

  test('deve expor links reais para cada página', () => {
    render(
      <DataPagination page={5} totalPages={20} getPageHref={getPageHref} onPageChange={vi.fn()} />,
    )

    expect(screen.getByRole('link', { name: 'Page 7' })).toHaveAttribute('href', '?page=7')
    expect(screen.getByRole('link', { name: 'Last page' })).toHaveAttribute('href', '?page=20')
  })

  test('deve solicitar a página selecionada sem recarregar a página', async () => {
    const onPageChange = vi.fn()
    render(
      <DataPagination
        page={5}
        totalPages={20}
        getPageHref={getPageHref}
        onPageChange={onPageChange}
      />,
    )

    await userEvent.click(screen.getByRole('link', { name: 'Next page' }))
    await userEvent.click(screen.getByRole('link', { name: 'Previous page' }))
    await userEvent.click(screen.getByRole('link', { name: 'Last page' }))
    await userEvent.click(screen.getByRole('link', { name: 'First page' }))
    await userEvent.click(screen.getByRole('link', { name: 'Page 7' }))

    expect(onPageChange.mock.calls.map(([page]) => page)).toEqual([6, 4, 20, 1, 7])
  })

  test('deve respeitar uma janela menor de páginas', () => {
    render(
      <DataPagination
        page={1}
        totalPages={20}
        getPageHref={getPageHref}
        onPageChange={vi.fn()}
        windowSize={5}
      />,
    )

    expect(screen.getAllByRole('link', { name: /^Page / })).toHaveLength(5)
  })
})
