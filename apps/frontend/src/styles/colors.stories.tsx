import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'

interface ColorToken {
  readonly token: string
  readonly className: string
  readonly usage: string
}

interface ColorGroup {
  readonly title: string
  readonly tokens: readonly ColorToken[]
}

const COLOR_GROUPS: readonly ColorGroup[] = [
  {
    title: 'Marca',
    tokens: [
      {
        token: 'primary',
        className: 'bg-primary',
        usage: 'Botões Search e Edit, links Cancel e Last, página atual, foco',
      },
      {
        token: 'primary-foreground',
        className: 'text-primary-foreground',
        usage: 'Texto sobre a cor da marca',
      },
    ],
  },
  {
    title: 'Feedback',
    tokens: [
      { token: 'success', className: 'bg-success', usage: 'Toasts de sucesso' },
      {
        token: 'destructive',
        className: 'bg-destructive',
        usage: 'Botão Delete, toasts de erro, ícone de alerta, erros de formulário',
      },
    ],
  },
  {
    title: 'Texto',
    tokens: [
      {
        token: 'heading',
        className: 'text-heading',
        usage: 'Título da página, títulos dos modais, cabeçalhos da tabela',
      },
      { token: 'foreground', className: 'text-foreground', usage: 'Texto padrão' },
      {
        token: 'muted-foreground',
        className: 'text-muted-foreground',
        usage: '"Showing results", "See … per page", placeholders',
      },
      { token: 'disabled', className: 'text-disabled', usage: 'Paginação desabilitada' },
    ],
  },
  {
    title: 'Superfícies',
    tokens: [
      { token: 'background', className: 'bg-background', usage: 'Página, campos e modais' },
      { token: 'muted', className: 'bg-muted', usage: 'Hover das linhas da tabela' },
      {
        token: 'secondary',
        className: 'bg-secondary',
        usage: 'Botões redondos de editar e remover',
      },
    ],
  },
  {
    title: 'Bordas e foco',
    tokens: [
      { token: 'border', className: 'border-border', usage: 'Divisores e linhas da tabela' },
      { token: 'input', className: 'border-input', usage: 'Borda dos campos e selects' },
      { token: 'ring', className: 'ring-ring', usage: 'Anel de foco do teclado' },
    ],
  },
]

function useCssVariable(name: string): string {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim())
  }, [name])

  return value
}

function ColorTile({ token, className, usage }: ColorToken) {
  const value = useCssVariable(token)

  return (
    <li className='flex flex-col overflow-hidden rounded-lg border shadow-sm'>
      <div
        role='img'
        aria-label={`${token} ${value}`}
        className='h-28 border-b'
        style={{ backgroundColor: `var(--${token})` }}
      />
      <div className='flex flex-col gap-1 p-3 text-sm'>
        <p className='flex items-center justify-between gap-2 font-bold text-heading'>
          {token}
          <span className='font-mono text-xs font-normal text-foreground'>
            {value.toUpperCase()}
          </span>
        </p>
        <code className='w-fit rounded-sm bg-muted px-1 text-xs'>{className}</code>
        <p className='text-xs text-muted-foreground'>{usage}</p>
      </div>
    </li>
  )
}

function ColorPalette() {
  return (
    <div className='flex flex-col gap-10'>
      {COLOR_GROUPS.map((group) => (
        <section key={group.title} aria-labelledby={`group-${group.title}`}>
          <h2 id={`group-${group.title}`} className='mb-4 text-xl font-bold text-heading'>
            {group.title}
          </h2>
          <ul className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
            {group.tokens.map((token) => (
              <ColorTile key={token.token} {...token} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

const meta = {
  title: 'Fundamentos/Cores',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Cores do projeto, exatamente como no Figma. Cada bloco é pintado com a variável CSS real de `src/styles/index.css` (padrão shadcn/ui, exposta ao Tailwind pelo `@theme inline`), e o hexadecimal é lido dela em tempo real. Nos componentes, use sempre a classe semântica indicada no bloco, nunca o hexadecimal.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Paleta: Story = {
  render: () => <ColorPalette />,
  parameters: {
    docs: {
      description: {
        story: 'Todas as cores, agrupadas por uso, com valor, classe e onde aparecem.',
      },
    },
  },
}
