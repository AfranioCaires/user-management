import { CircleCheckIcon, CircleXIcon } from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme='light'
      position='top-right'
      offset={{ top: 10, right: 20 }}
      mobileOffset={{ top: 10, right: 16, left: 16 }}
      duration={5000}
      containerAriaLabel='Notifications'
      icons={{
        success: <CircleCheckIcon className='size-5' strokeWidth={2.25} />,
        error: <CircleXIcon className='size-5' strokeWidth={2.25} />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'ml-auto flex min-h-12 w-fit items-center gap-2.5 rounded-md px-4 py-3 text-base shadow-[0_4px_12px_rgb(0_0_0/0.16)]',
          success: 'bg-success text-success-foreground',
          error: 'bg-destructive text-destructive-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
