import '@/styles/index.css'
import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    a11y: {
      test: 'todo',
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Fundamentos', ['Cores', 'Tipografia'], 'Shared', 'Features', 'Layouts'],
      },
    },
  },
}

export default preview
