import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'shine bg-primary text-primary-foreground shadow-[0_14px_30px_-14px_var(--ws-primary)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_var(--ws-primary)]',
        accent:
          'shine bg-brand-red text-brand-red-foreground shadow-[0_14px_30px_-14px_var(--ws-red)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_var(--ws-red)]',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70',
        outline:
          'border border-border bg-card/70 text-foreground backdrop-blur hover:border-primary/40 hover:bg-secondary/70 hover:text-primary',
        glass: 'border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20',
        light: 'bg-white text-[#0a2a6e] shadow-lg hover:-translate-y-0.5 hover:bg-white/90',
      },
      size: {
        default: 'min-h-11 px-5 py-2',
        lg: 'min-h-13 px-7 py-3 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
