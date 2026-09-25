import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, test } from 'vitest'

import { MainLayout } from './main-layout'

function renderLayout() {
  const router = createMemoryRouter([
    { element: <MainLayout />, children: [{ index: true, element: <p>Page content</p> }] },
  ])
  render(<RouterProvider router={router} />)
}

describe('MainLayout', () => {
  test('deve renderizar a página roteada dentro do landmark main', () => {
    renderLayout()

    expect(screen.getByRole('main')).toHaveTextContent('Page content')
  })

  test('deve oferecer um link para pular para o conteúdo principal', () => {
    renderLayout()

    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content',
    )
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })
})
