import { cn } from 'cn'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { MouseEvent } from 'react'

import { getPageWindow } from '@/shared/lib/page-window'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/ui/pagination'

export interface DataPaginationProps {
  readonly page: number
  readonly totalPages: number
  readonly getPageHref: (page: number) => string
  readonly onPageChange: (page: number) => void
  readonly windowSize?: number
}

const edgeClasses =
  'text-[11px] text-primary underline aria-disabled:text-disabled aria-disabled:no-underline'

const arrowClasses = 'text-heading aria-disabled:text-disabled'

export function DataPagination({
  page,
  totalPages,
  getPageHref,
  onPageChange,
  windowSize = 8,
}: DataPaginationProps) {
  const isFirst = page <= 1
  const isLast = page >= totalPages

  const navigate = (target: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onPageChange(target)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={getPageHref(1)}
            isDisabled={isFirst}
            onClick={navigate(1)}
            aria-label='First page'
            className={edgeClasses}
          >
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={getPageHref(page - 1)}
            isDisabled={isFirst}
            onClick={navigate(page - 1)}
            aria-label='Previous page'
            size='icon'
            className={arrowClasses}
          >
            <ChevronLeftIcon strokeWidth={2.5} />
          </PaginationLink>
        </PaginationItem>
        {getPageWindow(page, totalPages, windowSize).map((pageNumber) => {
          const isActive = pageNumber === page
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={getPageHref(pageNumber)}
                isActive={isActive}
                onClick={navigate(pageNumber)}
                aria-label={`Page ${pageNumber}`}
                className={cn(
                  'min-w-5 rounded-none border-b-2 px-0.5 pb-0.5',
                  isActive
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-neutral-500',
                )}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationLink
            href={getPageHref(page + 1)}
            isDisabled={isLast}
            onClick={navigate(page + 1)}
            aria-label='Next page'
            size='icon'
            className={arrowClasses}
          >
            <ChevronRightIcon strokeWidth={2.5} />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={getPageHref(totalPages)}
            isDisabled={isLast}
            onClick={navigate(totalPages)}
            aria-label='Last page'
            className={edgeClasses}
          >
            Last
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
