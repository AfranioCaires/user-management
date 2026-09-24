import { Button } from '@/shared/ui/button'

export type UsersFeedbackState = 'loading' | 'error' | 'empty'

export interface UsersFeedbackProps {
  readonly state: UsersFeedbackState
  readonly onRetry?: () => void
}

export function UsersFeedback({ state, onRetry }: UsersFeedbackProps) {
  if (state === 'loading') {
    return (
      <p role='status' className='py-10 text-center text-sm'>
        Loading users…
      </p>
    )
  }

  if (state === 'error') {
    return (
      <div role='alert' className='flex flex-col items-center gap-2 py-10 text-center text-sm'>
        <p className='font-bold text-heading'>We couldn’t load the users.</p>
        <p>Check your connection and try again.</p>
        {onRetry ? (
          <Button variant='link' size='inline' onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <div role='status' className='flex flex-col items-center gap-2 py-10 text-center text-sm'>
      <p className='font-bold text-heading'>No users found.</p>
      <p>Try adjusting the name or status filters.</p>
    </div>
  )
}
