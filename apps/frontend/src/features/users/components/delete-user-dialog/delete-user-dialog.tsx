import { TriangleAlertIcon } from 'lucide-react'

import type { User } from '@/features/users/model/user'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

export interface DeleteUserDialogProps {
  readonly user: User | null
  readonly onClose: () => void
  readonly onConfirm: (user: User) => void
}

export function DeleteUserDialog({ user, onClose, onConfirm }: DeleteUserDialogProps) {
  return (
    <Dialog open={user !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <TriangleAlertIcon
            aria-hidden='true'
            className='size-5 text-destructive'
            strokeWidth={2.25}
          />
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <DialogDescription className='mt-9'>
          Are you sure you want to delete the user “{user?.name}”? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant='link' size='inline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={() => {
              if (user) {
                onConfirm(user)
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
