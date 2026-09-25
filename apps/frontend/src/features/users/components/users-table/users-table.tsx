import { cn } from 'cn'

import { UserActions } from '@/features/users/components/user-actions/user-actions'
import { USER_STATUS_LABELS, type User } from '@/features/users/model/user'
import { formatDate } from '@/shared/lib/format-date'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

export interface UsersTableProps {
  readonly users: readonly User[]
  readonly isBusy?: boolean
  readonly onEdit: (user: User) => void
  readonly onDelete: (user: User) => void
}

const COLUMNS = ['Name', 'Status', 'Specie', 'Episodes', 'Origin', 'Created at'] as const

export function UsersTable({ users, isBusy = false, onEdit, onDelete }: UsersTableProps) {
  return (
    <Table
      aria-busy={isBusy || undefined}
      className={cn('table-fixed motion-safe:transition-opacity', isBusy && 'opacity-60')}
    >
      <TableCaption className='sr-only'>
        Users. Double-click a row to edit the user name.
      </TableCaption>
      <TableHeader>
        <TableRow className='hover:bg-transparent'>
          {COLUMNS.map((column) => (
            <TableHead key={column} scope='col'>
              {column}
            </TableHead>
          ))}
          <TableHead scope='col' className='w-18 px-1'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} onDoubleClick={() => onEdit(user)} className='group'>
            <th scope='row' className='truncate px-4 text-left font-normal'>
              {user.name}
            </th>
            <TableCell className='truncate'>{USER_STATUS_LABELS[user.status]}</TableCell>
            <TableCell className='truncate'>{user.species}</TableCell>
            <TableCell>{user.episodes}</TableCell>
            <TableCell className='truncate'>{user.origin}</TableCell>
            <TableCell>
              <time dateTime={user.createdAt}>{formatDate(user.createdAt)}</time>
            </TableCell>
            <TableCell className='px-1'>
              <UserActions user={user} onEdit={onEdit} onDelete={onDelete} revealOnHover />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
