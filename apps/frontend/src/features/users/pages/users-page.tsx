import { useEffect, useState } from 'react'

import { DeleteUserDialog } from '@/features/users/components/delete-user-dialog/delete-user-dialog'
import { EditUserDialog } from '@/features/users/components/edit-user-dialog/edit-user-dialog'
import { UsersCardList } from '@/features/users/components/users-card-list/users-card-list'
import { UsersFeedback } from '@/features/users/components/users-feedback/users-feedback'
import { UsersFilters } from '@/features/users/components/users-filters/users-filters'
import { UsersResultsFooter } from '@/features/users/components/users-results-footer/users-results-footer'
import { UsersTable } from '@/features/users/components/users-table/users-table'
import { useDeleteUser } from '@/features/users/hooks/use-delete-user'
import { useUpdateUserName } from '@/features/users/hooks/use-update-user-name'
import { useUsersFilters } from '@/features/users/hooks/use-users-filters'
import { useUsersQuery } from '@/features/users/hooks/use-users-query'
import type { User } from '@/features/users/model/user'
import { serializeUsersFilters } from '@/features/users/model/users-filters'
import { Separator } from '@/shared/ui/separator'

export function UsersPage() {
  const { filters, setFilters } = useUsersFilters()
  const usersQuery = useUsersQuery(filters)
  const updateUserName = useUpdateUserName()
  const deleteUser = useDeleteUser()
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const usersPage = usersQuery.data
  const users = usersPage?.data ?? []
  const totalPages = usersPage?.meta.totalPages ?? 0
  const isBusy = usersQuery.isFetching && usersQuery.isPlaceholderData

  useEffect(() => {
    if (totalPages > 0 && filters.page > totalPages) {
      setFilters({ page: totalPages })
    }
  }, [filters.page, totalPages, setFilters])

  const feedbackState = usersQuery.isPending
    ? 'loading'
    : usersQuery.isError
      ? 'error'
      : users.length === 0
        ? 'empty'
        : null

  return (
    <>
      <header>
        <h1 className='text-2xl leading-8 font-bold text-heading'>User Management</h1>
        <Separator className='mt-3' />
      </header>

      <section aria-label='Filters' className='mt-12'>
        <UsersFilters
          name={filters.name}
          status={filters.status}
          onSubmit={({ name, status }) => setFilters({ name, status, page: 1 })}
        />
      </section>

      <section aria-label='Users list' className='mt-8'>
        {feedbackState ? (
          <UsersFeedback state={feedbackState} onRetry={() => void usersQuery.refetch()} />
        ) : (
          <>
            <div className='hidden lg:block'>
              <UsersTable
                users={users}
                isBusy={isBusy}
                onEdit={setUserToEdit}
                onDelete={setUserToDelete}
              />
            </div>
            <div className='lg:hidden'>
              <UsersCardList
                users={users}
                isBusy={isBusy}
                onEdit={setUserToEdit}
                onDelete={setUserToDelete}
              />
            </div>
          </>
        )}

        {usersPage && usersPage.meta.total > 0 ? (
          <div className='mt-8'>
            <UsersResultsFooter
              page={filters.page}
              perPage={filters.perPage}
              total={usersPage.meta.total}
              totalPages={totalPages}
              getPageHref={(page) => `?${serializeUsersFilters({ ...filters, page })}`}
              onPageChange={(page) => setFilters({ page })}
              onPerPageChange={(perPage) => setFilters({ perPage, page: 1 })}
            />
          </div>
        ) : null}
      </section>

      <EditUserDialog
        user={userToEdit}
        onClose={() => setUserToEdit(null)}
        onSubmit={(user, name) => {
          setUserToEdit(null)
          updateUserName.mutate({ id: user.id, name })
        }}
      />

      <DeleteUserDialog
        user={userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={(user) => {
          setUserToDelete(null)
          deleteUser.mutate(user.id)
        }}
      />
    </>
  )
}
