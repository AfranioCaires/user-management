import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

const ROWS = [
  ['Rick Sanchez', 'Alive', 'Human', '2'],
  ['Morty Smith', 'Alive', 'Human', '14'],
  ['Rick Sanchez', 'Dead', 'Human', '3'],
] as const

const meta = {
  title: 'Shared/UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tabela do shadcn/ui ajustada ao Figma: cabeçalhos em maiúsculas, negrito e cor `heading`, com 52 px de altura; linhas de 40 px com divisor `border` e hover `muted`. É uma `<table>` semântica: use `TableHead` com `scope` e um `TableCaption` (pode ser `sr-only`) para dar contexto ao leitor de tela. Envolta em um contêiner com rolagem horizontal para não estourar a página.',
      },
    },
  },
  render: () => (
    <Table className='max-w-3xl'>
      <TableCaption className='sr-only'>Users</TableCaption>
      <TableHeader>
        <TableRow className='hover:bg-transparent'>
          <TableHead scope='col'>Name</TableHead>
          <TableHead scope='col'>Status</TableHead>
          <TableHead scope='col'>Specie</TableHead>
          <TableHead scope='col'>Episodes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map(([name, status, species, episodes], index) => (
          <TableRow key={`${name}-${index.toString()}`}>
            <TableCell>{name}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{species}</TableCell>
            <TableCell>{episodes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'Três linhas de exemplo. Passe o mouse para ver o hover.' },
    },
  },
}
