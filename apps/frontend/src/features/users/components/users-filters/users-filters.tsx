import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { USER_STATUS_LABELS, USER_STATUSES, type UserStatus } from '@/features/users/model/user'
import {
  type UsersFiltersFormValues,
  usersFiltersFormSchema,
} from '@/features/users/model/users-filters-form'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { NativeSelect, NativeSelectOption } from '@/shared/ui/native-select'

export interface UsersFiltersSubmit {
  readonly name: string
  readonly status: UserStatus | undefined
}

export interface UsersFiltersProps {
  readonly name: string
  readonly status: UserStatus | undefined
  readonly onSubmit: (filters: UsersFiltersSubmit) => void
}

export function UsersFilters({ name, status, onSubmit }: UsersFiltersProps) {
  const nameId = useId()
  const nameErrorId = useId()
  const statusId = useId()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersFiltersFormValues>({
    resolver: zodResolver(usersFiltersFormSchema),
    values: { name, status: status ?? '' },
  })

  return (
    <search aria-label='Filter users'>
      <form
        noValidate
        onSubmit={(event) =>
          void handleSubmit((values) =>
            onSubmit({ name: values.name, status: values.status || undefined }),
          )(event)
        }
        className='flex flex-col gap-4 sm:flex-row sm:items-start'
      >
        <div className='flex flex-col gap-1 sm:min-w-0 sm:flex-1 lg:w-89 lg:flex-none'>
          <Label htmlFor={nameId}>Name</Label>
          <Input
            id={nameId}
            type='search'
            autoComplete='off'
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? nameErrorId : undefined}
            {...register('name')}
          />
          {errors.name ? (
            <p id={nameErrorId} className='text-xs text-destructive'>
              {errors.name.message}
            </p>
          ) : null}
        </div>
        <div className='flex flex-col gap-1 sm:w-60 sm:shrink-0'>
          <Label htmlFor={statusId}>Status</Label>
          <NativeSelect id={statusId} className='w-full' {...register('status')}>
            <NativeSelectOption value=''>All</NativeSelectOption>
            {USER_STATUSES.map((option) => (
              <NativeSelectOption key={option} value={option}>
                {USER_STATUS_LABELS[option]}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <Button type='submit' className='sm:mt-5'>
          Search
        </Button>
      </form>
    </search>
  )
}
