import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon, TriangleAlertIcon } from 'lucide-react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { type EditUserFormValues, editUserFormSchema } from '@/features/users/model/edit-user-form'
import type { User } from '@/features/users/model/user'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export interface EditUserDialogProps {
  readonly user: User | null
  readonly onClose: () => void
  readonly onSubmit: (user: User, name: string) => void
}

export function EditUserDialog({ user, onClose, onSubmit }: EditUserDialogProps) {
  const formId = useId()
  const inputId = useId()
  const errorId = useId()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    values: { name: user?.name ?? '' },
  })

  return (
    <Dialog open={user !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <TriangleAlertIcon
            aria-hidden='true'
            className='size-5 text-destructive'
            strokeWidth={2.25}
          />
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form
          id={formId}
          noValidate
          className='mt-6 flex flex-col gap-1'
          onSubmit={(event) =>
            void handleSubmit((values) => {
              if (user) {
                onSubmit(user, values.name)
              }
            })(event)
          }
        >
          <Label htmlFor={inputId} className='sr-only'>
            Name
          </Label>
          <div className='relative'>
            <SearchIcon
              aria-hidden='true'
              strokeWidth={2.5}
              className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2'
            />
            <Input
              id={inputId}
              autoComplete='off'
              placeholder={user?.name}
              className='pl-9'
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? errorId : undefined}
              {...register('name')}
            />
          </div>
          {errors.name ? (
            <p id={errorId} className='text-xs text-destructive'>
              {errors.name.message}
            </p>
          ) : null}
        </form>
        <DialogFooter>
          <Button variant='link' size='inline' className='underline' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' form={formId}>
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
