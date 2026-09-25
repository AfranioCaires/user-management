import { createBrowserRouter, Navigate } from 'react-router'

import { UsersPage } from '@/features/users/pages/users-page'
import { MainLayout } from '@/layouts/main-layout/main-layout'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  },
])
