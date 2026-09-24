import { cn } from 'cn'
import { ChevronDownIcon } from 'lucide-react'
import type * as React from 'react'

type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
  size?: 'sm' | 'default'
}

function NativeSelect({ className, size = 'default', ...props }: NativeSelectProps) {
  return (
    <div
      className={cn(
        'group/native-select relative w-fit has-[select:disabled]:opacity-50',
        className,
      )}
      data-slot='native-select-wrapper'
      data-size={size}
    >
      <select
        data-slot='native-select'
        data-size={size}
        className='h-9 w-full min-w-0 cursor-pointer appearance-none rounded-sm border border-input bg-background pr-9 pl-3 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive data-[size=sm]:h-6 data-[size=sm]:pr-7 data-[size=sm]:pl-2 data-[size=sm]:text-xs'
        {...props}
      />
      <ChevronDownIcon
        className='pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-heading select-none group-data-[size=sm]/native-select:right-2 group-data-[size=sm]/native-select:size-3.5'
        strokeWidth={2.5}
        aria-hidden='true'
        data-slot='native-select-icon'
      />
    </div>
  )
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<'option'>) {
  return (
    <option
      data-slot='native-select-option'
      className={cn('bg-[Canvas] text-[CanvasText]', className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOption }
