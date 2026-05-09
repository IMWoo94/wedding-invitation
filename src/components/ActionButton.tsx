import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type BaseProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & { href?: undefined }

type ActionButtonProps = LinkProps | ButtonProps

export function ActionButton({ children, variant = 'secondary', className = '', ...props }: ActionButtonProps) {
  const classes = `apple-pill ${variant === 'primary' ? 'apple-pill-primary' : 'apple-pill-secondary'} ${className}`.trim()

  if ('href' in props && props.href) {
    const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    return (
      <a className={classes} {...linkProps}>
        {children}
      </a>
    )
  }

  const buttonProps = props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
  return (
    <button className={classes} type="button" {...buttonProps}>
      {children}
    </button>
  )
}
