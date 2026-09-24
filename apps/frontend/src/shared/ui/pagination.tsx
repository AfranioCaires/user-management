import { cn } from 'cn'
import type * as React from 'react'

import { Button } from '@/shared/ui/button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label='Pagination'
      data-slot='pagination'
      className={cn('flex justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn('flex flex-wrap items-center justify-center gap-x-2 gap-y-1', className)}
      {...props}
    />
  )
}

function PaginationItem(props: React.ComponentProps<'li'>) {
  return <li data-slot='pagination-item' {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  isDisabled?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size' | 'variant'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  isDisabled,
  size = 'inline',
  variant = 'ghost',
  href,
  ...props
}: PaginationLinkProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={isDisabled ? undefined : href}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={isDisabled || undefined}
        data-slot='pagination-link'
        data-active={isActive}
        {...props}
      />
    </Button>
  )
}

export { Pagination, PaginationContent, PaginationItem, PaginationLink }
