import { cn } from 'cn'

import { UserActions } from '@/features/users/components/user-actions/user-actions'
import { USER_STATUS_LABELS, type User } from '@/features/users/model/user'
import { formatDate } from '@/shared/lib/format-date'

export interface UsersCardListProps {
  readonly users: readonly User[]
  readonly isBusy?: boolean
  readonly onEdit: (user: User) => void
  readonly onDelete: (user: User) => void
}

export function UsersCardList({ users, isBusy = false, onEdit, onDelete }: UsersCardListProps) {
  return (
    <ul
      aria-label='Users'
      aria-busy={isBusy || undefined}
      className={cn(
        'border-t motion-safe:transition-opacity md:grid md:grid-cols-2 md:gap-x-8',
        isBusy && 'opacity-60',
      )}
    >
      {users.map((user) => (
        <li key={user.id} className='border-b py-4'>
          <article aria-label={user.name} className='flex flex-col gap-3'>
            <div className='flex items-center justify-between gap-4'>
              <h2 className='truncate text-base font-bold text-heading'>{user.name}</h2>
              <UserActions user={user} onEdit={onEdit} onDelete={onDelete} />
            </div>
            <dl className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm'>
              <div>
                <dt className='text-xs font-bold text-heading uppercase'>Status</dt>
                <dd>{USER_STATUS_LABELS[user.status]}</dd>
              </div>
              <div>
                <dt className='text-xs font-bold text-heading uppercase'>Specie</dt>
                <dd>{user.species}</dd>
              </div>
              <div>
                <dt className='text-xs font-bold text-heading uppercase'>Episodes</dt>
                <dd>{user.episodes}</dd>
              </div>
              <div>
                <dt className='text-xs font-bold text-heading uppercase'>Origin</dt>
                <dd>{user.origin}</dd>
              </div>
              <div>
                <dt className='text-xs font-bold text-heading uppercase'>Created at</dt>
                <dd>
                  <time dateTime={user.createdAt}>{formatDate(user.createdAt)}</time>
                </dd>
              </div>
            </dl>
          </article>
        </li>
      ))}
    </ul>
  )
}
