import { cn } from 'cn'
import { PencilIcon, Trash2Icon } from 'lucide-react'

import type { User } from '@/features/users/model/user'
import { Button } from '@/shared/ui/button'

export interface UserActionsProps {
  readonly user: User
  readonly onEdit: (user: User) => void
  readonly onDelete: (user: User) => void
  readonly revealOnHover?: boolean
}

const revealOnFocus = 'opacity-0 focus-visible:opacity-100 [@media(hover:none)]:opacity-100'

const revealOnRowHover = `${revealOnFocus} group-hover:opacity-100 group-focus-within:opacity-100`

export function UserActions({ user, onEdit, onDelete, revealOnHover = false }: UserActionsProps) {
  return (
    <div className='flex items-center justify-end gap-2'>
      <Button
        variant='secondary'
        size='icon-sm'
        aria-label={`Edit ${user.name}`}
        title={`Edit ${user.name}`}
        onClick={() => onEdit(user)}
        className={cn(revealOnHover && revealOnFocus)}
      >
        <PencilIcon aria-hidden='true' />
      </Button>
      <Button
        variant='secondary'
        size='icon-sm'
        aria-label={`Delete ${user.name}`}
        title={`Delete ${user.name}`}
        onClick={() => onDelete(user)}
        className={cn(revealOnHover && revealOnRowHover)}
      >
        <Trash2Icon aria-hidden='true' />
      </Button>
    </div>
  )
}
