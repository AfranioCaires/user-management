import { Outlet } from 'react-router'

export function MainLayout() {
  return (
    <div className='min-h-dvh bg-background'>
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white'
      >
        Skip to main content
      </a>
      <main
        id='main-content'
        tabIndex={-1}
        className='mx-auto w-full max-w-7xl px-4 py-6 outline-none sm:px-10 sm:py-10'
      >
        <Outlet />
      </main>
    </div>
  )
}
