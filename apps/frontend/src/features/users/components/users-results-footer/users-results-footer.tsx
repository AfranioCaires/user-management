import { useId } from 'react'

import { PER_PAGE_OPTIONS } from '@/features/users/model/users-filters'
import { DataPagination } from '@/shared/components/data-pagination/data-pagination'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { Label } from '@/shared/ui/label'
import { NativeSelect, NativeSelectOption } from '@/shared/ui/native-select'

export interface UsersResultsFooterProps {
  readonly page: number
  readonly perPage: number
  readonly total: number
  readonly totalPages: number
  readonly getPageHref: (page: number) => string
  readonly onPageChange: (page: number) => void
  readonly onPerPageChange: (perPage: number) => void
}

const DESKTOP_QUERY = '(min-width: 40rem)'

export function UsersResultsFooter({
  page,
  perPage,
  total,
  totalPages,
  getPageHref,
  onPageChange,
  onPerPageChange,
}: UsersResultsFooterProps) {
  const perPageId = useId()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const first = Math.min((page - 1) * perPage + 1, total)
  const last = Math.min(page * perPage, total)

  return (
    <div className='grid grid-cols-1 items-center gap-4 text-sm lg:grid-cols-[1fr_auto_1fr]'>
      <p role='status' className='text-center leading-tight text-muted-foreground lg:text-left'>
        Showing results
        <br />
        <span className='font-bold'>
          {first}-{last}
        </span>{' '}
        of {total}
      </p>
      <DataPagination
        page={page}
        totalPages={totalPages}
        getPageHref={getPageHref}
        onPageChange={onPageChange}
        windowSize={isDesktop ? 8 : 5}
      />
      <div className='flex items-center justify-center gap-2 text-muted-foreground lg:justify-end'>
        <span aria-hidden='true'>See</span>
        <Label htmlFor={perPageId} className='sr-only'>
          Results per page
        </Label>
        <NativeSelect
          id={perPageId}
          size='sm'
          className='w-15'
          value={String(perPage)}
          onChange={(event) => onPerPageChange(Number(event.target.value))}
        >
          {PER_PAGE_OPTIONS.map((option) => (
            <NativeSelectOption key={option} value={String(option)}>
              {option}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <span aria-hidden='true'>per page</span>
      </div>
    </div>
  )
}
