import type { Meta, StoryObj } from '@storybook/react-vite'

interface TypeStyle {
  readonly name: string
  readonly className: string
  readonly spec: string
  readonly sample: string
}

const TYPE_SCALE: readonly TypeStyle[] = [
  {
    name: 'Título da página',
    className: 'text-2xl leading-8 font-bold text-heading',
    spec: '24 px · 700 · text-2xl font-bold',
    sample: 'User Management',
  },
  {
    name: 'Título dos modais',
    className: 'text-xl font-bold text-heading',
    spec: '20 px · 700 · text-xl font-bold',
    sample: 'Delete User',
  },
  {
    name: 'Toasts',
    className: 'text-base',
    spec: '16 px · 400 · text-base',
    sample: 'User successfully deleted.',
  },
  {
    name: 'Cabeçalhos da tabela',
    className: 'text-sm font-bold text-heading uppercase',
    spec: '14 px · 700 · text-sm font-bold uppercase',
    sample: 'Name · Status · Created at',
  },
  {
    name: 'Células, botões e corpo',
    className: 'text-sm',
    spec: '14 px · 400 · text-sm',
    sample: 'Rick Sanchez · Alive · Human · 22/02/2024',
  },
  {
    name: 'Rótulos dos campos',
    className: 'text-xs',
    spec: '12 px · 400 · text-xs',
    sample: 'Name · Status',
  },
  {
    name: 'First e Last da paginação',
    className: 'text-[11px] text-primary underline',
    spec: '11 px · 400 · text-[11px]',
    sample: 'First · Last',
  },
]

function TypeScale() {
  return (
    <ul className='flex max-w-3xl flex-col'>
      {TYPE_SCALE.map((style) => (
        <li key={style.name} className='flex flex-col gap-1 border-b py-4'>
          <p className='text-xs text-muted-foreground'>
            {style.name} · <code className='rounded-sm bg-muted px-1'>{style.spec}</code>
          </p>
          <p className={style.className}>{style.sample}</p>
        </li>
      ))}
    </ul>
  )
}

const meta = {
  title: 'Fundamentos/Tipografia',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Escala tipográfica medida no Figma, em um frame de 1280 px. A fonte é a **Lato**, auto-hospedada via `@fontsource/lato` nos pesos 400 e 700, e importada no início de `src/styles/index.css`.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Escala: Story = {
  render: () => <TypeScale />,
  parameters: {
    docs: {
      description: {
        story: 'Cada estilo com tamanho, peso, classe Tailwind e um exemplo de onde aparece.',
      },
    },
  },
}
