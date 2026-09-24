import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateUserName } from '@/features/users/api/users.api'
import { usersQueryKeys } from '@/features/users/api/users.query-keys'

export interface UpdateUserNameVariables {
  readonly id: number
  readonly name: string
}

export function useUpdateUserName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, name }: UpdateUserNameVariables) => updateUserName(id, name),
    onSuccess: async () => {
      toast.success('User successfully edited.')
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
    },
    onError: () => {
      toast.error('Error editing user.')
    },
  })
}
