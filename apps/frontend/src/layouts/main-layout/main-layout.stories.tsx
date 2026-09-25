import type { Meta, StoryObj } from '@storybook/react-vite'
import { createMemoryRouter, RouterProvider } from 'react-router'

import { MainLayout } from './main-layout'

const meta = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Moldura de todas as páginas, renderizada pelo router como rota pai (as páginas entram no `<Outlet />`). Centraliza o conteúdo em até 1280 px, com respiro de 16 px no celular e 40 px a partir de 640 px, como no Figma. Traz o landmark `<main>` e um link **Skip to main content**, que só aparece ao receber foco pelo teclado (aperte Tab no canvas para ver).',
      },
    },
  },
  render: () => {
    const router = createMemoryRouter([
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <h1 className='text-2xl leading-8 font-bold text-heading'>User Management</h1>,
          },
        ],
      },
    ])
    return <RouterProvider router={router} />
  },
} satisfies Meta<typeof MainLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Layout com o título da página de usuários como conteúdo.' } },
  },
}
