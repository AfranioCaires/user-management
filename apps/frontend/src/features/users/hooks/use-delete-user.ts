import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteUser } from '@/features/users/api/users.api'
import { usersQueryKeys } from '@/features/users/api/users.query-keys'

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: async () => {
      toast.success('User successfully deleted.')
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
    },
    onError: () => {
      toast.error('Error deleting user.')
    },
  })
}
